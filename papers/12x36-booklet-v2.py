#!/usr/bin/env python3
"""Build the 8-page A5 reader and its 2-sheet A4 saddle-stitch imposition.

The booklet is intentionally shorter than the public paper. Its job is to
make the argument travel in a hand, then send the reader to the web surface
for the complete sources, limits and conceptual draft.
"""

from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import BooleanObject, DictionaryObject, NameObject, TextStringObject
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4, A5, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Frame, Image, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parent
ASSET_DIR = ROOT / "assets"
READER = ASSET_DIR / "12x36-direito-ao-tempo-booklet-v2-reader.pdf"
PRINT = ASSET_DIR / "12x36-direito-ao-tempo-booklet-v2-print-a4.pdf"
QR_PATH = ASSET_DIR / "qr-12x36.png"
URL = "https://www.luahelena.com.br/papers/12x36.html"
WHATSAPP = "(41) 9 9222-8411"

A5_W, A5_H = A5
A4_LANDSCAPE = landscape(A4)

PAPER = colors.HexColor("#f7f1e8")
PAPER_DEEP = colors.HexColor("#eee2d5")
INK = colors.HexColor("#1e2c36")
INK_SOFT = colors.HexColor("#46535a")
MUTED = colors.HexColor("#6b716f")
LINE = colors.HexColor("#d9cfc4")
BURGUNDY = colors.HexColor("#7a2947")
BURGUNDY_DARK = colors.HexColor("#551b33")
PINK = colors.HexColor("#ead3d0")
GREEN = colors.HexColor("#d8e5d6")
GREEN_DARK = colors.HexColor("#49685b")
OCHRE = colors.HexColor("#d8b66e")
BLUE = colors.HexColor("#d8e3e8")
WHITE = colors.HexColor("#fffdf8")


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Overline", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=7.7, leading=9.2, textColor=BURGUNDY, spaceAfter=4, uppercase=True))
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=29, leading=28, textColor=INK, spaceAfter=8, alignment=TA_LEFT))
styles.add(ParagraphStyle(name="CoverLine", parent=styles["Normal"], fontName="Times-Roman", fontSize=14.2, leading=17.3, textColor=INK_SOFT, spaceAfter=9))
styles.add(ParagraphStyle(name="SectionTitle", parent=styles["Heading1"], fontName="Times-Roman", fontSize=23.5, leading=23.5, textColor=INK, spaceAfter=9))
styles.add(ParagraphStyle(name="Subhead", parent=styles["Heading2"], fontName="Times-Bold", fontSize=13.4, leading=15.3, textColor=BURGUNDY_DARK, spaceBefore=2, spaceAfter=6))
styles.add(ParagraphStyle(name="Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.0, leading=12.3, textColor=INK_SOFT, spaceAfter=6))
styles.add(ParagraphStyle(name="BodyTight", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.1, leading=11.1, textColor=INK_SOFT, spaceAfter=3))
styles.add(ParagraphStyle(name="BodyWhite", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.0, leading=12.2, textColor=colors.HexColor("#f6e5e8"), spaceAfter=5))
styles.add(ParagraphStyle(name="SubheadWhite", parent=styles["Heading2"], fontName="Times-Bold", fontSize=13.4, leading=15.3, textColor=WHITE, spaceBefore=2, spaceAfter=6))
styles.add(ParagraphStyle(name="Small", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.5, leading=10.2, textColor=MUTED, spaceAfter=3))
styles.add(ParagraphStyle(name="Tiny", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.5, leading=9.8, textColor=MUTED, spaceAfter=2))
styles.add(ParagraphStyle(name="Formula", parent=styles["BodyText"], fontName="Times-Bold", fontSize=24, leading=24, textColor=BURGUNDY, spaceAfter=1))
styles.add(ParagraphStyle(name="FormulaSmall", parent=styles["BodyText"], fontName="Times-Bold", fontSize=15.5, leading=17, textColor=BURGUNDY_DARK, spaceAfter=1))
styles.add(ParagraphStyle(name="BigNumber", parent=styles["BodyText"], fontName="Times-Bold", fontSize=20, leading=20, textColor=BURGUNDY, alignment=TA_CENTER, spaceAfter=1))
styles.add(ParagraphStyle(name="CenterSmall", parent=styles["Small"], alignment=TA_CENTER))
styles.add(ParagraphStyle(name="Claim", parent=styles["BodyText"], fontName="Times-Bold", fontSize=12.3, leading=14.4, textColor=WHITE, spaceAfter=0))
styles.add(ParagraphStyle(name="WhiteBig", parent=styles["BodyText"], fontName="Times-Bold", fontSize=21, leading=22, textColor=BURGUNDY, spaceAfter=4))
styles.add(ParagraphStyle(name="SmallWhite", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.5, leading=10.2, textColor=colors.HexColor("#f6e5e8"), spaceAfter=3))
styles.add(ParagraphStyle(name="Ref", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.5, leading=10.0, textColor=INK_SOFT, spaceAfter=2.5))


def p(text, style="Body"):
    return Paragraph(text, styles[style])


def box(flowables, bg=WHITE, border=LINE, padding=9, width=None):
    table = Table([[flowables]], colWidths=[width] if width else None)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg), ("BOX", (0, 0), (-1, -1), .6, border),
        ("LEFTPADDING", (0, 0), (-1, -1), padding), ("RIGHTPADDING", (0, 0), (-1, -1), padding),
        ("TOPPADDING", (0, 0), (-1, -1), padding), ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return table


def row_grid(cells, widths, backgrounds, padding=8, border=LINE):
    table = Table([cells], colWidths=widths)
    commands = [
        ("GRID", (0, 0), (-1, -1), .45, border), ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), padding), ("RIGHTPADDING", (0, 0), (-1, -1), padding),
        ("TOPPADDING", (0, 0), (-1, -1), padding), ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
    ]
    for index, bg in enumerate(backgrounds):
        commands.append(("BACKGROUND", (index, 0), (index, 0), bg))
    table.setStyle(TableStyle(commands))
    return table


def list_block(items, style="BodyTight", color=BURGUNDY):
    return [p(f"<font color='{color.hexval()}'><b>+</b></font> {item}", style) for item in items]


def section_header(number, title, intro=None):
    content = [p(number, "Overline"), p(title, "SectionTitle")]
    if intro:
        content.append(p(intro, "Body"))
    return content


def on_page(canvas, doc):
    canvas.saveState()
    width, height = A5
    canvas.setFillColor(BURGUNDY)
    canvas.rect(0, height - 4.5 * mm, width, 4.5 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(.4)
    canvas.line(doc.leftMargin, 10.5 * mm, width - doc.rightMargin, 10.5 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 6.8)
    canvas.drawString(doc.leftMargin, 6.5 * mm, "12x36: o ponto cego da redução da jornada")
    canvas.drawRightString(width - doc.rightMargin, 6.5 * mm, f"Lua Helena Moon  |  {canvas.getPageNumber():02d}")
    canvas.restoreState()


def add_marked_metadata(input_path, output_path=None):
    """Keep text selectable and expose document language/marked metadata."""
    target = Path(output_path or input_path)
    reader = PdfReader(str(input_path))
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.add_metadata({
        "/Title": "12x36: o ponto cego da redução da jornada - Booklet v2",
        "/Author": "Lua Helena Moon Martins Cardoso",
        "/Subject": "Cartilha editorial da Nota Técnica 01/2026",
        "/Language": "pt-BR",
    })
    writer._root_object.update({
        NameObject("/Lang"): TextStringObject("pt-BR"),
        NameObject("/MarkInfo"): DictionaryObject({NameObject("/Marked"): BooleanObject(True)}),
        NameObject("/ViewerPreferences"): DictionaryObject({NameObject("/DisplayDocTitle"): BooleanObject(True)}),
    })
    tagged = target.with_name(target.stem + ".tagged.pdf")
    with tagged.open("wb") as handle:
        writer.write(handle)
    tagged.replace(target)


def build_reader():
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(READER), pagesize=A5, leftMargin=12.5 * mm, rightMargin=12.5 * mm,
        topMargin=13.5 * mm, bottomMargin=14 * mm,
        title="12x36: o ponto cego da redução da jornada - Booklet v2",
        author="Lua Helena Moon Martins Cardoso", subject="Cartilha editorial A5",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="a5")
    doc.addPageTemplates([PageTemplate(id="A5", frames=[frame], onPage=on_page)])
    story = []

    # Page 1: cover
    story += [p("ARTEFATO EDITORIAL V2 · NOTA TÉCNICA 01/2026", "Overline"), Spacer(1, 4 * mm),
              p("12x36: o ponto cego da redução da jornada", "CoverTitle"),
              p("O que está sendo regulado não é apenas uma escala. É tempo de vida.", "CoverLine")]
    claim = Table([[p("Se o teto geral da jornada cair abaixo de 42 horas, o regime 12x36 precisa reduzir junto - por compensação em tempo, sem redução salarial e sem abolir automaticamente a escala.", "Claim")]], colWidths=[doc.width])
    claim.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), BURGUNDY), ("LEFTPADDING", (0, 0), (-1, -1), 11), ("RIGHTPADDING", (0, 0), (-1, -1), 11), ("TOPPADDING", (0, 0), (-1, -1), 12), ("BOTTOMPADDING", (0, 0), (-1, -1), 12)]))
    story += [claim, Spacer(1, 7 * mm)]
    story.append(row_grid([
        p("7<br/><font size='8'>PLANTÕES</font>", "BigNumber"),
        p("84<br/><font size='8'>HORAS / 14 DIAS</font>", "BigNumber"),
        p("42<br/><font size='8'>HORAS / SEMANA</font>", "BigNumber"),
    ], [doc.width / 3] * 3, [PINK, GREEN, BLUE], padding=8))
    story += [Spacer(1, 7 * mm), p("O foco desta cartilha é direto: uma redução geral da jornada não pode deixar invisível a escala que conta por ciclo.", "CoverLine"), Spacer(1, 3 * mm)]
    story.append(box([
        p("Lua Helena Moon Martins Cardoso", "Subhead"),
        p("Psicóloga hospitalar · socióloga de formação<br/>Contribuição técnica independente", "BodyTight"),
        p("Baseada na Nota Técnica 01/2026 · Limeira, julho de 2026", "Small"),
    ], bg=PAPER_DEEP, border=LINE, padding=10))
    story.append(PageBreak())

    # Page 2: math and blind spot
    story += section_header("01 · a conta", "42 horas continuam sendo 42 horas", "A escala pode produzir mais folgas no calendário e, ao mesmo tempo, manter uma média semanal acima de um novo teto. A matemática impede que a jornada especial desapareça da redução geral.")
    story.append(box([
        p("7 x 12 = 84 h em 14 dias", "Formula"),
        p("84 / 2 = 42 h por semana, na média", "FormulaSmall"),
    ], bg=WHITE, border=BURGUNDY, padding=10))
    story.append(Spacer(1, 4 * mm))
    table = Table([
        [p("TETO", "Tiny"), p("14 DIAS", "Tiny"), p("12x36", "Tiny"), p("DIFERENÇA", "Tiny")],
        [p("44h", "BodyTight"), p("88h", "BodyTight"), p("84h", "BodyTight"), p("abaixo do teto", "BodyTight")],
        [p("40h", "BodyTight"), p("80h", "BodyTight"), p("84h", "BodyTight"), p("4h a compensar", "BodyTight")],
        [p("36h", "BodyTight"), p("72h", "BodyTight"), p("84h", "BodyTight"), p("12h: um plantão", "BodyTight")],
    ], colWidths=[doc.width * .18, doc.width * .22, doc.width * .19, doc.width * .41])
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), PAPER_DEEP), ("GRID", (0, 0), (-1, -1), .45, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5), ("BACKGROUND", (0, 3), (-1, 3), GREEN)]))
    story += [table, Spacer(1, 4 * mm), box([p("A matemática não determina sozinha a escala. Ela determina que a diferença precisa ser tratada.", "BodyTight")], bg=GREEN, border=GREEN_DARK, padding=8)]
    story.append(Spacer(1, 5 * mm))
    story.append(box([
        p("O ponto cego", "Subhead"),
        p("O 12x36 pode ser útil em serviços contínuos e pode ser preferido por trabalhadores. Isso não muda a pergunta: quando o teto geral cair, como devolver tempo sem esconder a diferença na média?", "BodyTight"),
    ], bg=PINK, border=BURGUNDY, padding=9))
    story.append(PageBreak())

    # Page 3: lived time and origin
    story += section_header("02 · tempo vivido", "36 horas fora do posto não são automaticamente 36 horas de vida livre", "A folga nominal é uma moldura. O tempo efetivamente recuperável depende do que acontece antes de a pessoa voltar a estar disponível para si.")
    story.append(row_grid([
        p("<font size='7.4'><b>SONO</b></font><br/>O corpo não reinicia quando o plantão termina.", "BodyTight"),
        p("<font size='7.4'><b>DESLOCAMENTO</b></font><br/>A ida e a volta também são tempo exigido pelo trabalho.", "BodyTight"),
        p("<font size='7.4'><b>CUIDADOS</b></font><br/>Casa, filhos, parentes e tarefas permanecem.", "BodyTight"),
        p("<font size='7.4'><b>RECUPERAÇÃO</b></font><br/>O tempo livre começa depois do necessário para voltar a estar disponível.", "BodyTight"),
    ], [doc.width / 4] * 4, [GREEN, PAPER_DEEP, PINK, WHITE], padding=7))
    story.append(Spacer(1, 7 * mm))
    story.append(box([
        p("De onde esta pauta vem", "SubheadWhite"),
        p("Esta reflexão nasceu sobretudo de um ano e quatro meses vividos pela autora como controladora de acesso em jornada 12x36 noturna. A experiência virou TCC sobre trabalho noturno e 12x36 e, depois, ganhou uma segunda lente com a atuação em psicologia hospitalar.", "BodyWhite"),
        p("Experiência situada dá origem à pergunta; não vira, sozinha, evidência universal.", "SmallWhite"),
    ], bg=BURGUNDY, border=BURGUNDY_DARK, padding=11))
    story.append(Spacer(1, 6 * mm))
    story.append(box([
        p("Cautela necessária", "Subhead"),
        p("Isso não significa que todo 12x36 seja pior que todo 6x1 ou que todos os trabalhadores vivam a escala da mesma forma. Significa que uma política de redução precisa enxergar o tempo que o ciclo deixa invisível.", "BodyTight"),
    ], bg=GREEN, border=GREEN_DARK, padding=9))
    story.append(PageBreak())

    # Page 4: does / does not
    story += section_header("03 · proposta", "Reduzir junto, não abolir por reflexo", "A proposta não trata uma escala extensa como um erro moral. Trata-a como uma forma de organizar o trabalho que precisa acompanhar o novo teto.")
    does = [p("FAZ", "Overline")] + list_block([
        "inclui expressamente o 12x36 no novo teto semanal",
        "devolve a diferença em tempo",
        "preserva salário",
        "mantém a norma coletiva mais favorável",
        "prevê transição para serviços contínuos",
    ])
    not_does = [p("NÃO FAZ", "Overline")] + list_block([
        "não extingue automaticamente o 12x36",
        "não afirma que ele seja sempre pior que o 6x1",
        "não transforma dinheiro em substituto integral do descanso",
        "não apresenta minuta conceitual como lei pronta",
    ], color=GREEN_DARK)
    story.append(row_grid([does, not_does], [doc.width / 2] * 2, [PINK, GREEN], padding=10))
    story.append(Spacer(1, 7 * mm))
    principle = Table([[p("PRINCÍPIO", "Overline"), p("Mesmo teto semanal por média + compensação em tempo + proteção salarial + negociação coletiva mais favorável.", "FormulaSmall")]], colWidths=[doc.width * .25, doc.width * .75])
    principle.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), PAPER_DEEP), ("BOX", (0, 0), (-1, -1), .6, OCHRE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9), ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10)]))
    story.append(principle)
    story.append(Spacer(1, 6 * mm))
    story.append(box([p("A fórmula é deliberadamente simples. O desenho da transição é que exige assessoria, dados e negociação.", "Body")], bg=WHITE, border=LINE, padding=10))
    story.append(PageBreak())

    # Page 5: counterproof and minimum legal frame
    story += section_header("04 · contraprova", "Uma boa proposta precisa sobreviver às melhores objeções", "A segurança do argumento vem de reconhecer o que há de forte nas objeções e responder com desenho institucional, não com slogan.")
    objections = [
        [p("<b>Muita gente prefere o 12x36.</b><br/>A preferência é relevante. Ela não elimina o direito a um teto geral e a uma compensação que preserve a escolha sem naturalizar o excesso.", "BodyTight"), p("<b>Serviços contínuos não podem parar.</b><br/>A resposta é transição setorial, dimensionamento, negociação e tempo para reorganizar, não uma exceção invisível.", "BodyTight")],
        [p("<b>42 horas já são menos que 44.</b><br/>Sim. A proposta não apaga esse ganho; pergunta como acompanhar um teto que pode ficar abaixo de 42.", "BodyTight"), p("<b>A negociação coletiva já pode resolver.</b><br/>Ela é parte da solução. O piso legal impede que tempo e salário dependam apenas da assimetria de cada mesa.", "BodyTight")],
    ]
    objection_table = Table(objections, colWidths=[doc.width / 2] * 2)
    objection_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, 0), PINK), ("BACKGROUND", (1, 0), (1, 0), GREEN), ("BACKGROUND", (0, 1), (0, 1), BLUE), ("BACKGROUND", (1, 1), (1, 1), PAPER_DEEP), ("GRID", (0, 0), (-1, -1), .45, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9)]))
    story.append(objection_table)
    story.append(Spacer(1, 6 * mm))
    story.append(box([
        p("Piso atual", "Subhead"),
        p("O art. 59-A da CLT disciplina o 12x36 e admite sua instituição inclusive por acordo individual escrito. A proposta parte da pergunta seguinte: se o teto geral cair, qual proteção garante que essa jornada especial reduza junto?", "BodyTight"),
        p("A Reforma de 2017 reduziu salvaguardas anteriores em pontos específicos; dizer que retirou todos os direitos seria maximalista. A íntegra jurídica e as referências estão na página pública.", "Small"),
    ], bg=PAPER_DEEP, border=OCHRE, padding=9))
    story.append(PageBreak())

    # Page 6: legislative proposal
    story += section_header("05 · redação", "A fórmula é simples", "A minuta integral fica na página web. No papel, quatro regras precisam ser lembradas sem carregar a nota técnica inteira.")
    formula = Table([[p("teto geral por média", "FormulaSmall"), p("+", "FormulaSmall"), p("compensação em tempo", "FormulaSmall")], [p("salário preservado", "FormulaSmall"), p("+", "FormulaSmall"), p("norma coletiva mais favorável", "FormulaSmall")]], colWidths=[doc.width * .43, doc.width * .08, doc.width * .49])
    formula.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GREEN), ("BOX", (0, 0), (-1, -1), .6, GREEN_DARK), ("INNERGRID", (0, 0), (-1, -1), .35, GREEN_DARK), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("ALIGN", (1, 0), (1, -1), "CENTER"), ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8)]))
    story.append(formula)
    story.append(Spacer(1, 7 * mm))
    rules = [
        [p("01", "BigNumber"), p("O 12x36 observa, por média, o teto semanal constitucional ou legal aplicável.", "Body")],
        [p("02", "BigNumber"), p("O excesso vira descanso remunerado, menos plantões ou redução equivalente de tempo.", "Body")],
        [p("03", "BigNumber"), p("Não há redução salarial e o tempo não é integralmente substituído por dinheiro.", "Body")],
        [p("04", "BigNumber"), p("Condições coletivas mais favoráveis permanecem preservadas.", "Body")],
    ]
    rule_table = Table(rules, colWidths=[doc.width * .18, doc.width * .82])
    rule_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, -1), PINK), ("BACKGROUND", (1, 0), (1, -1), WHITE), ("GRID", (0, 0), (-1, -1), .45, LINE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8)]))
    story.append(rule_table)
    story.append(Spacer(1, 7 * mm))
    story.append(box([
        p("O que ainda depende de desenho", "Subhead"),
        p("A redação legal final depende de assessoria legislativa, período de referência, regras sobre intervalos e adicionais e transição setorial para serviços contínuos.", "Body"),
    ], bg=PAPER_DEEP, border=OCHRE, padding=10))
    story.append(PageBreak())

    # Page 7: institutional path and essential sources
    story += section_header("06 · encaminhamento", "O próximo passo é institucional", "A cartilha convence o suficiente para merecer encaminhamento. A página web sustenta o aprofundamento, as fontes, os limites e a minuta integral.")
    steps = [
        [p("01 · TRIAGEM JURÍDICA", "Overline"), p("Localizar onde o 12x36 entra na tramitação da redução.", "BodyTight")],
        [p("02 · MAPA E ESCUTA", "Overline"), p("Ouvir saúde, segurança, portaria, cuidado e outros serviços contínuos.", "BodyTight")],
        [p("03 · BOAS PRÁTICAS", "Overline"), p("Identificar proteção adicional já construída em negociação coletiva.", "BodyTight")],
        [p("04 · MESA E TRANSIÇÃO", "Overline"), p("Construir redação, fiscalização, adaptação e revisão.", "BodyTight")],
    ]
    step_table = Table(steps, colWidths=[doc.width * .5] * 2)
    step_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, 0), PINK), ("BACKGROUND", (1, 0), (1, 0), GREEN), ("BACKGROUND", (0, 1), (0, 1), BLUE), ("BACKGROUND", (1, 1), (1, 1), PAPER_DEEP), ("GRID", (0, 0), (-1, -1), .45, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8)]))
    story.append(step_table)
    story.append(Spacer(1, 5 * mm))
    story.append(box([
        p("Ainda falta medir", "Subhead"),
        p("+ prevalência nacional do 12x36 por setor e turno<br/>+ efeitos de diferentes arranjos sobre saúde, renda e vida social<br/>+ boas práticas coletivas já existentes", "BodyTight"),
    ], bg=GREEN, border=GREEN_DARK, padding=8))
    story.append(Spacer(1, 5 * mm))
    story.append(box([
        p("Fontes essenciais", "Subhead"),
        p("CLT, arts. 59-A e 60 · Lei 13.467/2017 · TST, Súmula 444 · Rogers et al. (2004) · IARC, volume 124", "BodyTight"),
        p("Fontes, referências completas, método, limites e minuta integral: <b>QR na contracapa.</b>", "Small"),
    ], bg=WHITE, border=LINE, padding=8))
    story.append(PageBreak())

    # Page 8: back cover / CTA
    story += [p("07 · contracapa", "Overline"), Spacer(1, 4 * mm), p("O direito ao tempo não pode terminar na porta do plantão.", "WhiteBig")]
    cta = Table([[p("Encaminhe esta contribuição à assessoria responsável pelas pautas trabalhistas e pela redução da jornada.", "Claim")]], colWidths=[doc.width])
    cta.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), BURGUNDY), ("BOX", (0, 0), (-1, -1), .6, BURGUNDY_DARK), ("LEFTPADDING", (0, 0), (-1, -1), 11), ("RIGHTPADDING", (0, 0), (-1, -1), 11), ("TOPPADDING", (0, 0), (-1, -1), 12), ("BOTTOMPADDING", (0, 0), (-1, -1), 12)]))
    story.append(cta)
    story.append(Spacer(1, 5 * mm))
    if QR_PATH.exists():
        qr = Image(str(QR_PATH), width=43 * mm, height=43 * mm)
        qr_table = Table([[qr, [p("Leia a proposta completa, fontes e minuta.", "Subhead"), p(URL, "Small"), p("O booklet é a entrada rápida. A página pública é a mesa de trabalho.", "BodyTight")]]], colWidths=[48 * mm, doc.width - 48 * mm])
        qr_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), WHITE), ("BOX", (0, 0), (-1, -1), .6, LINE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8)]))
        story.append(qr_table)
    story.append(Spacer(1, 5 * mm))
    story.append(p("Lua Helena", "Subhead"))
    story.append(p(f"WhatsApp: <b>{WHATSAPP}</b>", "BodyTight"))
    story.append(Spacer(1, 2 * mm))
    story.append(box([
        p("Psicóloga hospitalar e socióloga de formação. Viveu um ano e quatro meses em 12x36 noturno como controladora de acesso e desenvolveu TCC sobre trabalho noturno e a escala.", "BodyTight"),
        p("Contribuição técnica independente. Não representa posição oficial de partido, mandato, órgão público, sindicato ou empregador.", "Small"),
    ], bg=PAPER_DEEP, border=LINE, padding=8))

    doc.build(story)
    add_marked_metadata(READER)


def impose_print_pdf():
    reader = PdfReader(str(READER))
    writer = PdfWriter()
    sheet_width, sheet_height = A4_LANDSCAPE
    gap = sheet_width - (2 * A5_W)
    left_x = gap / 2
    right_x = left_x + A5_W
    imposed_order = [
        (7, 0),  # physical sheet 1, outer side: [8 | 1]
        (1, 6),  # physical sheet 1, inner side: [2 | 7]
        (5, 2),  # physical sheet 2, outer side: [6 | 3]
        (3, 4),  # physical sheet 2, inner side: [4 | 5]
    ]
    for left_page, right_page in imposed_order:
        sheet = writer.add_blank_page(width=sheet_width, height=sheet_height)
        sheet.merge_translated_page(reader.pages[left_page], left_x, 0, expand=False)
        sheet.merge_translated_page(reader.pages[right_page], right_x, 0, expand=False)
    writer.add_metadata({
        "/Title": "12x36: o ponto cego da redução da jornada - Booklet v2 - impressão A4",
        "/Author": "Lua Helena Moon Martins Cardoso",
        "/Subject": "Imposição A4 paisagem para livreto A5, saddle-stitch",
        "/Language": "pt-BR",
    })
    raw = PRINT.with_name(PRINT.stem + ".raw.pdf")
    with raw.open("wb") as handle:
        writer.write(handle)
    raw.replace(PRINT)
    add_marked_metadata(PRINT)


def main():
    build_reader()
    impose_print_pdf()
    print(READER)
    print(PRINT)


if __name__ == "__main__":
    main()
