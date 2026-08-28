#!/usr/bin/env python3
"""Build the political-first A5 reader and its A4 saddle-stitch imposition.

Booklet v3 is a new version. The v1 and v2 source/PDF artifacts remain
untouched so the version history is recoverable and auditable.
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
READER = ASSET_DIR / "12x36-direito-ao-tempo-booklet-v3-reader.pdf"
PRINT = ASSET_DIR / "12x36-direito-ao-tempo-booklet-v3-print-a4.pdf"
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
styles.add(ParagraphStyle(name="Overline", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=7.6, leading=9.1, textColor=BURGUNDY, spaceAfter=4))
styles.add(ParagraphStyle(name="OverlineWhite", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=7.6, leading=9.1, textColor=colors.HexColor("#f6e5e8"), spaceAfter=4))
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=28.5, leading=27.2, textColor=INK, spaceAfter=8, alignment=TA_LEFT))
styles.add(ParagraphStyle(name="CoverLine", parent=styles["Normal"], fontName="Times-Roman", fontSize=14.0, leading=17.0, textColor=INK_SOFT, spaceAfter=9))
styles.add(ParagraphStyle(name="SectionTitle", parent=styles["Heading1"], fontName="Times-Roman", fontSize=22.8, leading=22.8, textColor=INK, spaceAfter=8))
styles.add(ParagraphStyle(name="Subhead", parent=styles["Heading2"], fontName="Times-Bold", fontSize=13.0, leading=14.8, textColor=BURGUNDY_DARK, spaceBefore=2, spaceAfter=5))
styles.add(ParagraphStyle(name="Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.7, leading=11.8, textColor=INK_SOFT, spaceAfter=5))
styles.add(ParagraphStyle(name="BodyTight", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.9, leading=10.7, textColor=INK_SOFT, spaceAfter=2.5))
styles.add(ParagraphStyle(name="BodyWhite", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.4, leading=11.4, textColor=colors.HexColor("#f6e5e8"), spaceAfter=4))
styles.add(ParagraphStyle(name="SubheadWhite", parent=styles["Heading2"], fontName="Times-Bold", fontSize=13.0, leading=14.8, textColor=WHITE, spaceBefore=2, spaceAfter=5))
styles.add(ParagraphStyle(name="Small", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.1, leading=9.6, textColor=MUTED, spaceAfter=2.5))
styles.add(ParagraphStyle(name="Tiny", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.8, leading=9.0, textColor=MUTED, spaceAfter=2))
styles.add(ParagraphStyle(name="Formula", parent=styles["BodyText"], fontName="Times-Bold", fontSize=23.5, leading=23.5, textColor=BURGUNDY, spaceAfter=1))
styles.add(ParagraphStyle(name="FormulaSmall", parent=styles["BodyText"], fontName="Times-Bold", fontSize=14.3, leading=15.7, textColor=BURGUNDY_DARK, spaceAfter=1))
styles.add(ParagraphStyle(name="FormulaSmallWhite", parent=styles["BodyText"], fontName="Times-Bold", fontSize=14.3, leading=15.7, textColor=WHITE, spaceAfter=1))
styles.add(ParagraphStyle(name="BigNumber", parent=styles["BodyText"], fontName="Times-Bold", fontSize=19, leading=19, textColor=BURGUNDY, alignment=TA_CENTER, spaceAfter=1))
styles.add(ParagraphStyle(name="Claim", parent=styles["BodyText"], fontName="Times-Bold", fontSize=11.8, leading=13.8, textColor=WHITE, spaceAfter=0))
styles.add(ParagraphStyle(name="WhiteBig", parent=styles["BodyText"], fontName="Times-Bold", fontSize=20.5, leading=21.5, textColor=BURGUNDY, spaceAfter=4))
styles.add(ParagraphStyle(name="SmallWhite", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.2, leading=9.8, textColor=colors.HexColor("#f6e5e8"), spaceAfter=2.5))
styles.add(ParagraphStyle(name="Ref", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.0, leading=9.4, textColor=INK_SOFT, spaceAfter=2.2))


def p(text, style="Body"):
    return Paragraph(text, styles[style])


def box(flowables, bg=WHITE, border=LINE, padding=9):
    table = Table([[flowables]], colWidths=[None])
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
    canvas.setFont("Helvetica", 6.6)
    canvas.drawString(doc.leftMargin, 6.5 * mm, "12x36 também é direito ao tempo")
    canvas.drawRightString(width - doc.rightMargin, 6.5 * mm, f"Lua Helena Moon  |  {canvas.getPageNumber():02d}")
    canvas.restoreState()


def add_marked_metadata(input_path):
    """Keep text selectable and expose document language/marked metadata."""
    target = Path(input_path)
    reader = PdfReader(str(target))
    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.add_metadata({
        "/Title": "12x36 também é direito ao tempo - Booklet v3",
        "/Author": "Lua Helena Moon Martins Cardoso",
        "/Subject": "Cartilha editorial política-first da Nota Técnica 01/2026",
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
        title="12x36 também é direito ao tempo - Booklet v3",
        author="Lua Helena Moon Martins Cardoso", subject="Cartilha editorial A5",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="a5")
    doc.addPageTemplates([PageTemplate(id="A5", frames=[frame], onPage=on_page)])
    story = []

    # Page 1: cover and thesis
    story += [p("ARTEFATO EDITORIAL V3 · NOTA TÉCNICA 01/2026", "Overline"), Spacer(1, 4 * mm),
              p("12x36 também é<br/>direito ao tempo", "CoverTitle"),
              p("A redução geral da jornada deve alcançar as escalas especiais.", "CoverLine")]
    claim = Table([[p("O 12x36 pode continuar onde fizer sentido - mas não como exceção automática ao novo direito ao tempo. A redução deve chegar por média, com compensação em tempo, salário preservado e negociação coletiva mais favorável.", "Claim")]], colWidths=[doc.width])
    claim.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), BURGUNDY), ("LEFTPADDING", (0, 0), (-1, -1), 11), ("RIGHTPADDING", (0, 0), (-1, -1), 11), ("TOPPADDING", (0, 0), (-1, -1), 12), ("BOTTOMPADDING", (0, 0), (-1, -1), 12)]))
    story += [claim, Spacer(1, 7 * mm)]
    story.append(box([
        p("O que esta cartilha defende", "Subhead"),
        p("Uma conquista geral não pode terminar na porta do plantão. Preservar a escala onde fizer sentido não significa preservá-la fora do novo direito ao tempo.", "Body"),
        p("Por quê? Um ciclo regular de 12x36 chega a 42 horas semanais na média. A demonstração está na página 3.", "Small"),
    ], bg=PAPER_DEEP, border=OCHRE, padding=10))
    story += [Spacer(1, 8 * mm), p("Lua Helena Moon Martins Cardoso", "Subhead"),
              p("Psicóloga hospitalar · socióloga de formação<br/>Contribuição técnica independente", "BodyTight"),
              p("Nota Técnica 01/2026 · Limeira, julho de 2026", "Small"), PageBreak()]

    # Page 2: political dispute and principle
    story += section_header("01 · disputa política", "Uma conquista geral não pode terminar na porta do plantão", "O debate público costuma partir da escala mais visível. A pergunta desta cartilha é quem recebe a redução e quem fica esperando quando o trabalho se organiza por ciclos especiais.")
    story.append(row_grid([
        [p("A PERGUNTA", "Overline"), p("O PRINCÍPIO", "Overline")],
        [p("Se o teto geral cair, o 12x36 pode continuar produzindo uma média acima dele? Se puder, onde fica o ganho em tempo para quem trabalha em plantões e noites?", "BodyTight"), p("Se o país reduz a jornada, a escala 12x36 reduz junto. A continuidade do serviço pode ser preservada por desenho setorial, não por exclusão automática.", "BodyTight")],
    ], [doc.width / 2] * 2, [PINK, GREEN], padding=8))
    story.append(Spacer(1, 6 * mm))
    principle = Table([[p("TESE POLÍTICA", "OverlineWhite"), p("O direito ao tempo também precisa alcançar quem trabalha em uma escala especial.", "FormulaSmallWhite")]], colWidths=[doc.width * .30, doc.width * .70])
    principle.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), BURGUNDY), ("TEXTCOLOR", (0, 0), (-1, -1), WHITE), ("BOX", (0, 0), (-1, -1), .6, BURGUNDY_DARK), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9), ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10)]))
    story.append(principle)
    story.append(Spacer(1, 6 * mm))
    story.append(box([
        p("Não é uma tese de abolição", "Subhead"),
        p("Há pessoas que preferem o 12x36 e serviços que precisam de continuidade. A proposta preserva essa possibilidade, mas exige teto, compensação, salário e transição verificáveis.", "Body"),
    ], bg=WHITE, border=LINE, padding=9))
    story.append(PageBreak())

    # Page 3: math after the thesis
    story += section_header("02 · demonstração", "A conta demonstra o ponto cego", "A matemática vem depois da tese. Ela explicita o volume de horas que uma regra de teto precisa alcançar; não decide sozinha como a folga é vivida nem qual redação será adotada.")
    story.append(box([
        p("7 x 12 = 84 h em 14 dias", "Formula"),
        p("84 / 2 = 42 h por semana, na média", "FormulaSmall"),
    ], bg=WHITE, border=BURGUNDY, padding=10))
    story.append(Spacer(1, 4 * mm))
    table = Table([
        [p("TETO", "Tiny"), p("14 DIAS", "Tiny"), p("12x36", "Tiny"), p("DIFERENÇA", "Tiny")],
        [p("44h", "BodyTight"), p("88h", "BodyTight"), p("84h", "BodyTight"), p("4h abaixo do teto", "BodyTight")],
        [p("40h", "BodyTight"), p("80h", "BodyTight"), p("84h", "BodyTight"), p("4h a compensar", "BodyTight")],
        [p("36h", "BodyTight"), p("72h", "BodyTight"), p("84h", "BodyTight"), p("12h: um plantão", "BodyTight")],
    ], colWidths=[doc.width * .18, doc.width * .22, doc.width * .19, doc.width * .41])
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), PAPER_DEEP), ("GRID", (0, 0), (-1, -1), .45, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5), ("BACKGROUND", (0, 3), (-1, 3), GREEN)]))
    story += [table, Spacer(1, 5 * mm), box([p("Se o teto geral ficar abaixo de 42 horas, a escala precisa ser ajustada explicitamente. A forma da compensação é uma decisão jurídica, setorial e coletiva.", "BodyTight")], bg=GREEN, border=GREEN_DARK, padding=9)]
    story.append(Spacer(1, 6 * mm))
    story.append(box([
        p("A fórmula não é a finalidade", "Subhead"),
        p("A matemática demonstra uma exclusão possível. A política decide que a redução também vale para quem trabalha em 12x36.", "Body"),
    ], bg=PINK, border=BURGUNDY, padding=9))
    story.append(PageBreak())

    # Page 4: lived time and situated origin
    story += section_header("03 · tempo vivido", "Folga no calendário não é sinônimo de vida livre", "Sono, deslocamento, cuidado e recuperação ocupam a folga. O intervalo cronológico existe; o tempo efetivamente recuperável depende das condições concretas.")
    story.append(row_grid([
        p("<font size='7.4'><b>SONO</b></font><br/>O corpo não reinicia quando o plantão termina.", "BodyTight"),
        p("<font size='7.4'><b>DESLOCAMENTO</b></font><br/>A ida e a volta também são tempo exigido pelo trabalho.", "BodyTight"),
        p("<font size='7.4'><b>CUIDADO</b></font><br/>Casa, filhos, parentes e tarefas permanecem.", "BodyTight"),
        p("<font size='7.4'><b>RECUPERAÇÃO</b></font><br/>O tempo livre começa depois do necessário para voltar a estar disponível.", "BodyTight"),
    ], [doc.width / 4] * 4, [GREEN, PAPER_DEEP, PINK, WHITE], padding=7))
    story.append(Spacer(1, 7 * mm))
    story.append(box([
        p("De onde esta pauta vem", "SubheadWhite"),
        p("A reflexão nasceu de um ano e quatro meses vividos pela autora como controladora de acesso em jornada 12x36 noturna. A experiência virou TCC sobre trabalho noturno e 12x36 e ganhou outra lente com a atuação em psicologia hospitalar.", "BodyWhite"),
        p("Experiência situada dá origem à pergunta; não vira, sozinha, evidência universal.", "SmallWhite"),
    ], bg=BURGUNDY, border=BURGUNDY_DARK, padding=11))
    story.append(Spacer(1, 6 * mm))
    story.append(box([
        p("Cautela necessária", "Subhead"),
        p("Isso não significa que todo 12x36 seja pior que todo 6x1 ou que todos vivam a escala da mesma forma. Significa que uma redução precisa enxergar o tempo que o ciclo deixa invisível.", "BodyTight"),
    ], bg=GREEN, border=GREEN_DARK, padding=9))
    story.append(PageBreak())

    # Page 5: proposal and strongest objections
    story += section_header("04 · proposta", "Reduzir junto, não abolir por reflexo", "A proposta trata o 12x36 como uma forma de organizar o trabalho que pode ser preservada, mas precisa acompanhar o novo teto.")
    does = [p("FAZ", "Overline")] + list_block([
        "inclui expressamente o 12x36 no teto semanal",
        "devolve a diferença em tempo",
        "preserva salário e norma coletiva mais favorável",
        "prevê transição para serviços contínuos",
    ])
    not_does = [p("NÃO FAZ", "Overline")] + list_block([
        "não extingue automaticamente o 12x36",
        "não afirma que ele seja sempre pior que o 6x1",
        "não transforma dinheiro em substituto integral do descanso",
        "não apresenta minuta como lei pronta",
    ], color=GREEN_DARK)
    story.append(row_grid([does, not_does], [doc.width / 2] * 2, [PINK, GREEN], padding=9))
    story.append(Spacer(1, 5 * mm))
    story.append(box([
        p("Objeções que o desenho precisa responder", "Subhead"),
        p("Preferência pela escala: preservar a escolha não exige preservar o excesso. · Continuidade do serviço: requer transição, dimensionamento e negociação. · 42h < 44h: o ganho existente não elimina a pergunta sobre um teto abaixo de 42.", "BodyTight"),
    ], bg=BLUE, border=LINE, padding=8))
    story.append(Spacer(1, 5 * mm))
    principle = Table([[p("PRINCÍPIO", "Overline"), p("Mesmo teto semanal por média + compensação em tempo + salário preservado + negociação coletiva mais favorável.", "FormulaSmall")]], colWidths=[doc.width * .25, doc.width * .75])
    principle.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), PAPER_DEEP), ("BOX", (0, 0), (-1, -1), .6, OCHRE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9), ("TOPPADDING", (0, 0), (-1, -1), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9)]))
    story.append(principle)
    story.append(PageBreak())

    # Page 6: norm design and legal micro-frame
    story += section_header("05 · desenho normativo", "Uma fórmula política; uma redação ainda aberta", "O papel leva quatro regras para debate. A formulação final depende de assessoria legislativa, Constituição, CLT, jurisprudência, saúde, segurança e transição setorial.")
    formula = Table([[p("teto geral por média", "FormulaSmall"), p("+", "FormulaSmall"), p("compensação em tempo", "FormulaSmall")], [p("salário preservado", "FormulaSmall"), p("+", "FormulaSmall"), p("norma coletiva mais favorável", "FormulaSmall")]], colWidths=[doc.width * .43, doc.width * .08, doc.width * .49])
    formula.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GREEN), ("BOX", (0, 0), (-1, -1), .6, GREEN_DARK), ("INNERGRID", (0, 0), (-1, -1), .35, GREEN_DARK), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("ALIGN", (1, 0), (1, -1), "CENTER"), ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8)]))
    story.append(formula)
    story.append(Spacer(1, 5 * mm))
    rules = [
        [p("01", "BigNumber"), p("O 12x36 observa, por média, o teto semanal constitucional ou legal aplicável.", "BodyTight")],
        [p("02", "BigNumber"), p("A diferença vira descanso remunerado, menos plantões ou redução equivalente de tempo.", "BodyTight")],
        [p("03", "BigNumber"), p("Não há redução salarial e o tempo não é integralmente substituído por dinheiro.", "BodyTight")],
        [p("04", "BigNumber"), p("Condições coletivas mais favoráveis permanecem preservadas, com transição e revisão.", "BodyTight")],
    ]
    rule_table = Table(rules, colWidths=[doc.width * .18, doc.width * .82])
    rule_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, -1), PINK), ("BACKGROUND", (1, 0), (1, -1), WHITE), ("GRID", (0, 0), (-1, -1), .45, LINE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7)]))
    story.append(rule_table)
    story.append(Spacer(1, 5 * mm))
    story.append(box([
        p("Quadro jurídico mínimo", "Subhead"),
        p("O art. 59-A da CLT disciplina o 12x36, inclusive por acordo individual escrito. A Reforma de 2017 e a Súmula 444 do TST entram na análise. A cartilha situa a pergunta; não substitui parecer jurídico.", "BodyTight"),
    ], bg=PAPER_DEEP, border=OCHRE, padding=8))
    story.append(PageBreak())

    # Page 7: institutional mandate and essential references
    story += section_header("06 · encaminhamento", "O próximo passo é colocar o 12x36 dentro da discussão legislativa", "A proposta ganha força quando vira trabalho verificável: triagem, escuta, comparação de práticas, modelagem e transição.")
    steps = [
        [p("01 · TRIAGEM", "Overline"), p("Encaminhar a tese à assessoria trabalhista e constitucional.", "BodyTight")],
        [p("02 · ESCUTA", "Overline"), p("Ouvir trabalhadores, sindicatos, empregadores e serviços contínuos.", "BodyTight")],
        [p("03 · PRÁTICAS", "Overline"), p("Reunir escalas, folgas, riscos e cláusulas coletivas existentes.", "BodyTight")],
        [p("04 · TRANSIÇÃO", "Overline"), p("Modelar 40h e 36h, prazo, contratação, monitoramento e revisão.", "BodyTight")],
    ]
    step_table = Table([steps[0], steps[1], steps[2], steps[3]], colWidths=[doc.width / 2] * 2)
    step_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, 0), PINK), ("BACKGROUND", (1, 0), (1, 0), GREEN), ("BACKGROUND", (0, 1), (0, 1), BLUE), ("BACKGROUND", (1, 1), (1, 1), PAPER_DEEP), ("BACKGROUND", (0, 2), (0, 2), GREEN), ("BACKGROUND", (1, 2), (1, 2), PINK), ("BACKGROUND", (0, 3), (0, 3), PAPER_DEEP), ("BACKGROUND", (1, 3), (1, 3), BLUE), ("GRID", (0, 0), (-1, -1), .45, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7)]))
    story.append(step_table)
    story.append(Spacer(1, 5 * mm))
    story.append(box([
        p("Ainda falta medir", "Subhead"),
        p("+ prevalência nacional do 12x36 por setor e turno<br/>+ tempo real de deslocamento, cuidado, sono e recuperação<br/>+ efeitos sobre segurança, renda e continuidade", "BodyTight"),
    ], bg=GREEN, border=GREEN_DARK, padding=8))
    story.append(Spacer(1, 5 * mm))
    story.append(box([
        p("Fontes essenciais", "Subhead"),
        p("CLT, arts. 59-A e 60 · Lei 13.467/2017 · TST, Súmula 444 · Rogers et al. (2004) · IARC, volume 124", "BodyTight"),
        p("Fontes completas, limites e desenho conceitual: QR na contracapa.", "Small"),
    ], bg=WHITE, border=LINE, padding=8))
    story.append(PageBreak())

    # Page 8: back cover / CTA / QR
    story += [p("07 · contracapa", "Overline"), Spacer(1, 4 * mm), p("O direito ao tempo não pode terminar na porta do plantão.", "WhiteBig")]
    cta = Table([[p("Encaminhe esta contribuição à assessoria responsável pelas pautas trabalhistas e pela redução da jornada.", "Claim")]], colWidths=[doc.width])
    cta.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), BURGUNDY), ("BOX", (0, 0), (-1, -1), .6, BURGUNDY_DARK), ("LEFTPADDING", (0, 0), (-1, -1), 11), ("RIGHTPADDING", (0, 0), (-1, -1), 11), ("TOPPADDING", (0, 0), (-1, -1), 12), ("BOTTOMPADDING", (0, 0), (-1, -1), 12)]))
    story.append(cta)
    story.append(Spacer(1, 5 * mm))
    if QR_PATH.exists():
        qr = Image(str(QR_PATH), width=42 * mm, height=42 * mm)
        qr_table = Table([[qr, [p("Leia a proposta completa, fontes e minuta.", "Subhead"), p(URL, "Small"), p("O booklet é a entrada rápida. A página pública é a mesa de trabalho.", "BodyTight")]]], colWidths=[47 * mm, doc.width - 47 * mm])
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
    if len(reader.pages) != 8:
        raise RuntimeError(f"Reader must have 8 pages, got {len(reader.pages)}")
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
        "/Title": "12x36 também é direito ao tempo - Booklet v3 - impressão A4",
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