import re
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Preformatted, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

def parse_markdown_to_platypus(md_file_path, pdf_file_path):
    with open(md_file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    doc = SimpleDocTemplate(
        pdf_file_path,
        pagesize=letter,
        rightMargin=54, leftMargin=54, topMargin=54, bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom colors
    primary_color = colors.HexColor('#1E293B')   # Dark Slate
    secondary_color = colors.HexColor('#3B82F6') # Blue Accent
    accent_color = colors.HexColor('#0F172A')    # Deep Navy
    text_color = colors.HexColor('#334155')      # Body Slate
    code_bg = colors.HexColor('#F8FAFC')
    code_border = colors.HexColor('#CBD5E1')

    # Modify/Add Styles
    styles['Normal'].textColor = text_color
    styles['Normal'].fontSize = 10
    styles['Normal'].leading = 14
    styles['Normal'].alignment = TA_LEFT

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=accent_color,
        alignment=TA_CENTER,
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'DocH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=accent_color,
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'DocH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=secondary_color,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=5
    )

    code_style = ParagraphStyle(
        'DocCode',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#1E1E1E')
    )

    story = []
    
    # Process lines
    i = 0
    in_code_block = False
    code_lines = []
    in_table = False
    table_rows = []

    def format_inline(text):
        # Escape HTML symbols first or handle bold/code tags
        text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        # Restore bold **...**
        text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
        # Restore inline code `...`
        text = re.sub(r'`(.*?)`', r'<font name="Courier" color="#1D4ED8">\1</font>', text)
        # Restore LaTeX $...$
        text = re.sub(r'\$(.*?)\$', r'<b>\1</b>', text)
        return text

    while i < len(lines):
        line = lines[i].rstrip()

        # Handle Code Block Check
        if line.startswith('```'):
            if not in_code_block:
                in_code_block = True
                code_lines = []
            else:
                in_code_block = False
                code_text = '\n'.join(code_lines)
                # Wrap preformatted in a table for clean borders & background
                p = Preformatted(code_text, code_style)
                t = Table([[p]], colWidths=[504])
                t.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, -1), code_bg),
                    ('BOX', (0, 0), (-1, -1), 0.5, code_border),
                    ('TOPPADDING', (0, 0), (-1, -1), 8),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                    ('LEFTPADDING', (0, 0), (-1, -1), 10),
                    ('RIGHTPADDING', (0, 0), (-1, -1), 10),
                ]))
                story.append(Spacer(1, 4))
                story.append(t)
                story.append(Spacer(1, 8))
            i += 1
            continue

        if in_code_block:
            code_lines.append(line)
            i += 1
            continue

        # Handle Table Check
        if line.startswith('|'):
            if not in_table:
                in_table = True
                table_rows = []
            
            # Check if separator row (| :--- |)
            if '---' in line:
                i += 1
                continue
                
            cells = [c.strip() for c in line.split('|')[1:-1]]
            formatted_cells = [Paragraph(format_inline(c), styles['Normal']) for c in cells]
            table_rows.append(formatted_cells)
            
            # Check if next line is not a table
            if i + 1 >= len(lines) or not lines[i + 1].lstrip().startswith('|'):
                in_table = False
                if table_rows:
                    t = Table(table_rows, colWidths=[70, 70, 110, 254])
                    t.setStyle(TableStyle([
                        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F1F5F9')),
                        ('TEXTCOLOR', (0, 0), (-1, 0), accent_color),
                        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                        ('FONTSIZE', (0, 0), (-1, -1), 9),
                        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                        ('TOPPADDING', (0, 0), (-1, -1), 6),
                        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
                    ]))
                    story.append(Spacer(1, 6))
                    story.append(t)
                    story.append(Spacer(1, 10))
            i += 1
            continue

        # Handle Horizontal Rule
        if line == '---':
            story.append(Spacer(1, 8))
            story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#E2E8F0'), spaceAfter=10))
            i += 1
            continue

        # Empty line
        if not line:
            story.append(Spacer(1, 4))
            i += 1
            continue

        # Headings
        if line.startswith('# '):
            story.append(Paragraph(format_inline(line[2:]), title_style))
            story.append(Spacer(1, 4))
        elif line.startswith('## '):
            story.append(Paragraph(format_inline(line[3:]), h1_style))
        elif line.startswith('### '):
            story.append(Paragraph(format_inline(line[4:]), h2_style))
        elif line.startswith('- ') or line.startswith('* '):
            story.append(Paragraph('• ' + format_inline(line[2:]), bullet_style))
        else:
            story.append(Paragraph(format_inline(line), styles['Normal']))

        i += 1

    # Build PDF
    doc.build(story)
    print(f"Successfully generated PDF: {pdf_file_path}")

if __name__ == '__main__':
    md_path = os.path.join(os.path.dirname(__file__), 'BRD.md')
    pdf_path = os.path.join(os.path.dirname(__file__), 'BRD.pdf')
    parse_markdown_to_platypus(md_path, pdf_path)
