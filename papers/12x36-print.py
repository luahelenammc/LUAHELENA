#!/usr/bin/env python3
"""Build the editable, print-first 12x36 mini-paper with ReportLab.

The long-form web page is the public reading surface. This script is the
versionable source for the separate A4 editorial artifact.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parent
ASSET_DIR = ROOT / "assets"
OUTPUT = ASSET_DIR / "12x36-direito-ao-tempo-artefato.pdf"
QR_PATH = ASSET_DIR / "qr-12x36.png"
URL = "https://www.luahelena.com.br/papers/12x36.html"
WHATSAPP = "(41) 9 9222-8411"

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
styles.add(ParagraphStyle(
    name="Overline", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=7.3, leading=9, textColor=BURGUNDY, spaceAfter=4,
    tracking=1.2, uppercase=True,
))
styles.add(ParagraphStyle(
    name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold",
    fontSize=31, leading=29, textColor=INK, spaceAfter=9,
))
styles.add(ParagraphStyle(
    name="CoverDeck", parent=styles["Normal"], fontName="Times-Roman",
    fontSize=15, leading=18, textColor=INK_SOFT, spaceAfter=13,
))
styles.add(ParagraphStyle(
    name="Claim", parent=styles["Normal"], fontName="Times-Bold",
    fontSize=15, leading=18, textColor=WHITE, spaceAfter=0,
))
styles.add(ParagraphStyle(
    name="SectionTitle", parent=styles["Heading1"], fontName="Times-Roman",
    fontSize=24, leading=24, textColor=INK, spaceAfter=12,
))
styles.add(ParagraphStyle(
    name="Subhead", parent=styles["Heading2"], fontName="Times-Bold",
    fontSize=14, leading=16, textColor=BURGUNDY_DARK, spaceBefore=5, spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="Body", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9.25, leading=12.4, textColor=INK_SOFT, spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="BodyTight", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=8.45, leading=10.8, textColor=INK_SOFT, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="BodyWhite", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9.2, leading=12.2, textColor=colors.HexColor("#f3dfe3"), spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="SubheadWhite", parent=styles["Heading2"], fontName="Times-Bold",
    fontSize=14, leading=16, textColor=WHITE, spaceBefore=5, spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="Small", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=7.4, leading=9.2, textColor=MUTED, spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="TableHead", parent=styles["BodyText"], fontName="Helvetica-Bold",
    fontSize=7.1, leading=8.5, textColor=BURGUNDY_DARK,
))
styles.add(ParagraphStyle(
    name="TableCell", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=7.65, leading=9.4, textColor=INK_SOFT,
))
styles.add(ParagraphStyle(
    name="TableCellBold", parent=styles["BodyText"], fontName="Helvetica-Bold",
    fontSize=7.65, leading=9.4, textColor=INK,
))
styles.add(ParagraphStyle(
    name="Formula", parent=styles["BodyText"], fontName="Times-Bold",
    fontSize=30, leading=30, textColor=BURGUNDY, spaceAfter=0,
))
styles.add(ParagraphStyle(
    name="BigNumber", parent=styles["BodyText"], fontName="Times-Bold",
    fontSize=22, leading=22, textColor=BURGUNDY,
))
styles.add(ParagraphStyle(
    name="CTA", parent=styles["BodyText"], fontName="Times-Bold",
    fontSize=20, leading=21, textColor=WHITE, spaceAfter=7,
))
styles.add(ParagraphStyle(
    name="Ref", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=7.2, leading=8.9, textColor=INK_SOFT, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name="CenterSmall", parent=styles["Small"], alignment=TA_CENTER,
))


def p(text, style="Body"):
    return Paragraph(text, styles[style])


def card(content, bg=WHITE, border=LINE, padding=10, widths=None):
    table = Table([[content]], colWidths=widths)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("BOX", (0, 0), (-1, -1), 0.6, border),
        ("LEFTPADDING", (0, 0), (-1, -1), padding),
        ("RIGHTPADDING", (0, 0), (-1, -1), padding),
        ("TOPPADDING", (0, 0), (-1, -1), padding),
        ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
    ]))
    return table


def grid(items, widths, backgrounds=None, paddings=9, valign="TOP"):
    rows = items if items and isinstance(items[0], (list, tuple)) else [items]
    table = Table(rows, colWidths=widths)
    commands = [
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE),
        ("VALIGN", (0, 0), (-1, -1), valign),
        ("LEFTPADDING", (0, 0), (-1, -1), paddings),
        ("RIGHTPADDING", (0, 0), (-1, -1), paddings),
        ("TOPPADDING", (0, 0), (-1, -1), paddings),
        ("BOTTOMPADDING", (0, 0), (-1, -1), paddings),
    ]
    if backgrounds:
        for index, bg in enumerate(backgrounds):
            commands.append(("BACKGROUND", (index, 0), (index, len(rows) - 1), bg))
    table.setStyle(TableStyle(commands))
    return table


def data_table(headers, rows, widths, font_size=7.65):
    head = [p(item, "TableHead") for item in headers]
    body = []
    for row in rows:
        body.append([p(item, "TableCellBold" if i == 0 else "TableCell") for i, item in enumerate(row)])
    table = Table([head] + body, colWidths=widths, repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PAPER_DEEP),
        ("TEXTCOLOR", (0, 0), (-1, 0), BURGUNDY_DARK),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def bullet_list(items, style="BodyTight", color=None):
    parts = []
    for item in items:
        parts.append(p(f"<font color='{(color or BURGUNDY).hexval()}'><b>+</b></font> {item}", style))
    return parts


def on_page(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(BURGUNDY)
    canvas.rect(0, height - 6 * mm, width, 6 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(.45)
    canvas.line(doc.leftMargin, 13 * mm, width - doc.rightMargin, 13 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(doc.leftMargin, 8 * mm, "12x36: o ponto cego da redução da jornada")
    canvas.drawRightString(width - doc.rightMargin, 8 * mm, f"Lua Helena Moon  |  {canvas.getPageNumber():02d}")
    canvas.restoreState()


def title_block(number, title, intro=None):
    content = [p(number, "Overline"), p(title, "SectionTitle")]
    if intro:
        content.append(p(intro, "Body"))
    return content


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUTPUT), pagesize=A4,
        leftMargin=16 * mm, rightMargin=16 * mm,
        topMargin=17 * mm, bottomMargin=18 * mm,
        title="12x36: o ponto cego da redução da jornada",
        author="Lua Helena Moon Martins Cardoso",
        subject="Artefato editorial da Nota Técnica 01/2026",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="A4", frames=[frame], onPage=on_page)])

    story = []

    # 1. Cover
    story += [p("ARTEFATO EDITORIAL · NOTA TÉCNICA 01/2026", "Overline"),
              Spacer(1, 10 * mm),
              p("12x36: o ponto cego da redução da jornada", "CoverTitle"),
              p("O que está sendo regulado não é apenas uma escala. É tempo de vida.", "CoverDeck"),
              Spacer(1, 5 * mm)]
    claim = Table([[p("A redução da jornada ficará incompleta se o regime 12x36 continuar autorizado a operar, por padrão, com média de 42 horas semanais e sem garantia legal de compensação adicional em tempo.", "Claim")]], colWidths=[doc.width])
    claim.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BURGUNDY),
        ("LEFTPADDING", (0, 0), (-1, -1), 13),
        ("RIGHTPADDING", (0, 0), (-1, -1), 13),
        ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
    ]))
    story.append(claim)
    story.append(Spacer(1, 7 * mm))
    cover_facts = grid([
        [p("7 plantões", "BigNumber"), p("84 horas", "BigNumber"), p("42 horas/semana", "BigNumber")],
        [p("em 14 dias", "CenterSmall"), p("no ciclo", "CenterSmall"), p("na média", "CenterSmall")],
    ], [doc.width / 3] * 3, [PINK, GREEN, BLUE], paddings=9)
    story.append(cover_facts)
    story.append(Spacer(1, 8 * mm))
    story.append(p("Proposta: incluir expressamente o 12x36 na agenda de redução, devolver a diferença em tempo, preservar salário e respeitar a negociação coletiva mais favorável. Não é proposta de abolição automática.", "Body"))
    story.append(Spacer(1, 6 * mm))
    story.append(grid([
        [p("Lua Helena Moon Martins Cardoso<br/><font color='#6b716f'>Psicóloga hospitalar · socióloga de formação · contribuição técnica independente</font>", "Body"),
         p("Limeira · julho de 2026<br/><font color='#6b716f'>Leia a página completa:</font><br/><font color='#551b33'>" + URL + "</font>", "Body")]
    ], [doc.width * .6, doc.width * .4], [WHITE, PAPER_DEEP], paddings=10))
    story.append(PageBreak())

    # 2. Fast read
    story += title_block("01 · leitura rápida", "A decisão em cinco respostas", "Esta peça física resume a nota original para circulação, leitura em mesa e encaminhamento. A formulação completa, as fontes e os limites estão na página pública.")
    story.append(grid([
        [p("01<br/><b>Qual é a conta?</b><br/>7 x 12 = 84 horas em 14 dias. Divididas por duas semanas, são 42 horas semanais na média.", "BodyTight"),
         p("02<br/><b>O que muda em um teto menor?</b><br/>A diferença deve voltar em folga paga, menos plantões ou reorganização equivalente.", "BodyTight"),
         p("03<br/><b>36 horas são livres?</b><br/>Não automaticamente. Sono, deslocamento, cuidado e recuperação ocupam o tempo fora do posto.", "BodyTight")]
    ], [doc.width / 3] * 3, [PINK, GREEN, BLUE], paddings=10))
    story.append(Spacer(1, 7 * mm))
    story += [p("O que a proposta faz", "Subhead")]
    story += bullet_list([
        "inclui expressamente o regime 12x36 em qualquer agenda de redução do teto semanal",
        "devolve em tempo a diferença entre o teto aplicável e a média efetivamente realizada",
        "preserva o salário e mantém adicionais legais e coletivos",
        "preserva condições coletivas mais favoráveis",
        "prevê transição por setor para serviços que precisam de continuidade",
    ])
    story += [Spacer(1, 4 * mm), p("O que a proposta não faz", "Subhead")]
    story += bullet_list([
        "não afirma que todo 12x36 é pior que todo 6x1",
        "não trata 12x36 como erro a ser abolido automaticamente",
        "não troca integralmente tempo de recuperação por dinheiro",
        "não apresenta a minuta conceitual como lei pronta",
        "não representa oficialmente partido, mandato, órgão público, sindicato ou empregador",
    ], color=GREEN_DARK)
    story.append(Spacer(1, 6 * mm))
    story.append(card([p("<b>Princípio de desenho</b>", "Subhead"), p("Mesmo teto semanal por média + compensação em tempo + proteção salarial + negociação coletiva mais favorável.", "CoverDeck")], bg=GREEN, border=GREEN_DARK, padding=12))
    story.append(PageBreak())

    # 3. Math
    story += title_block("02 · conta aberta", "Quando a semana vira média", "A escala alterna doze horas de trabalho e trinta e seis de descanso. O quadro não mede a vida inteira; explicita o volume que uma regra de teto precisa alcançar.")
    story.append(card([
        p("7 x 12 = 84 horas em 14 dias", "Formula"),
        p("84 / 2 = 42 horas por semana, na média", "BigNumber"),
        Spacer(1, 4 * mm),
        p("Ciclo demonstrativo", "Overline"),
        Table([[p("01<br/><b>12h</b>", "CenterSmall"), p("02<br/>folga", "CenterSmall"), p("03<br/><b>12h</b>", "CenterSmall"), p("04<br/>folga", "CenterSmall"), p("05<br/><b>12h</b>", "CenterSmall"), p("06<br/>folga", "CenterSmall"), p("07<br/><b>12h</b>", "CenterSmall"), p("08<br/>folga", "CenterSmall"), p("09<br/><b>12h</b>", "CenterSmall"), p("10<br/>folga", "CenterSmall"), p("11<br/><b>12h</b>", "CenterSmall"), p("12<br/>folga", "CenterSmall"), p("13<br/><b>12h</b>", "CenterSmall"), p("14<br/>folga", "CenterSmall")]], colWidths=[doc.width / 14] * 14, style=TableStyle([
            ("GRID", (0, 0), (-1, -1), .35, LINE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("BACKGROUND", (0, 0), (0, 0), BURGUNDY), ("BACKGROUND", (2, 0), (2, 0), BURGUNDY),
            ("BACKGROUND", (4, 0), (4, 0), BURGUNDY), ("BACKGROUND", (6, 0), (6, 0), BURGUNDY),
            ("BACKGROUND", (8, 0), (8, 0), BURGUNDY), ("BACKGROUND", (10, 0), (10, 0), BURGUNDY),
            ("BACKGROUND", (12, 0), (12, 0), BURGUNDY), ("TEXTCOLOR", (0, 0), (-1, -1), INK),
            ("TEXTCOLOR", (0, 0), (0, 0), WHITE), ("TEXTCOLOR", (2, 0), (2, 0), WHITE),
            ("TEXTCOLOR", (4, 0), (4, 0), WHITE), ("TEXTCOLOR", (6, 0), (6, 0), WHITE),
            ("TEXTCOLOR", (8, 0), (8, 0), WHITE), ("TEXTCOLOR", (10, 0), (10, 0), WHITE),
            ("TEXTCOLOR", (12, 0), (12, 0), WHITE), ("LEFTPADDING", (0, 0), (-1, -1), 2),
            ("RIGHTPADDING", (0, 0), (-1, -1), 2), ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ])),
        p("A média é aritmética; a recuperação é humana e depende das condições concretas.", "Small"),
    ], bg=WHITE, border=LINE, padding=12))
    story.append(Spacer(1, 6 * mm))
    story.append(data_table(
        ["Teto semanal", "Máximo em 14 dias", "12x36 regular", "Diferença a tratar"],
        [
            ["44h", "88h", "84h", "4h abaixo do teto"],
            ["40h", "80h", "84h", "4h: compensar ou reorganizar"],
            ["36h", "72h", "84h", "12h: um plantão a compensar"],
        ], [doc.width * .18, doc.width * .25, doc.width * .22, doc.width * .35]
    ))
    story.append(Spacer(1, 4 * mm))
    story.append(card([p("Se o teto geral ficar abaixo de 42 horas, a escala precisa ser ajustada explicitamente. Esta tabela não escolhe a solução: mostra a diferença que o texto legal e a negociação terão de resolver.", "BodyTight")], bg=PAPER_DEEP, border=OCHRE, padding=10))
    story.append(PageBreak())

    # 4. Time and 6x1
    story += title_block("03 · tempo vivido", "Uma folga no calendário não é uma vida desocupada", "A diferença entre intervalo cronológico e tempo de vida recuperável é central para não celebrar uma redução que apenas desloca o cansaço.")
    story.append(grid([
        [p("<b>SONO</b><br/>O corpo não reinicia no momento em que o plantão termina.", "BodyTight"), p("<b>DESLOCAMENTO</b><br/>A ida e a volta também são tempo exigido pelo trabalho.", "BodyTight"), p("<b>CUIDADOS</b><br/>Casa, filhos, parentes e tarefas não desaparecem na folga.", "BodyTight"), p("<b>RECUPERAÇÃO</b><br/>Tempo livre começa depois do que foi necessário para voltar a estar disponível.", "BodyTight")]
    ], [doc.width * .25] * 4, [GREEN, PAPER_DEEP, PINK, WHITE], paddings=9))
    story.append(Spacer(1, 7 * mm))
    story.append(card([
        p("O ponto cego do 6x1 também pode estar no 12x36", "SubheadWhite"),
        p("A comparação não autoriza uma hierarquia universal de sofrimento. Há pessoas que preferem o 12x36 e serviços que precisam de continuidade. O ponto é outro: jornadas de 12 horas, especialmente noturnas, podem concentrar fadiga e deslocar a recuperação para uma folga que já começa ocupada.", "BodyWhite"),
        p("A reflexão nasceu de um ano e quatro meses como controladora de acesso em jornada 12x36 noturna, do TCC <i>Trabalho noturno e regime 12/36: precarização da saúde e direitos dos vigias e vigilantes em Limeira (SP)</i> e da experiência em psicologia hospitalar.", "BodyWhite"),
    ], bg=BURGUNDY, border=BURGUNDY_DARK, padding=13))
    story.append(Spacer(1, 6 * mm))
    story.append(card([p("<b>Limite da afirmação:</b> a nota não demonstrou que todo trabalhador 12x36 vive a mesma carga, nem que todo 6x1 produz o mesmo dano. Ela propõe medir e proteger o tempo que a média semanal deixa invisível.", "BodyTight")], bg=GREEN, border=GREEN_DARK, padding=10))
    story.append(PageBreak())

    # 5. Legal safeguards
    story += title_block("04 · base jurídica", "A regra atual já escolhe onde a proteção precisa ser reaberta", "O art. 59-A da CLT reconhece a jornada 12x36 por acordo individual escrito ou instrumento coletivo. A mesma moldura dá tratamento específico a feriados, prorrogação noturna, intervalos e insalubridade.")
    story.append(data_table(
        ["Instituto", "O que a regra registra", "Pergunta para a próxima etapa"],
        [
            ["Feriados", "Considerados compensados pela remuneração mensal prevista no art. 59-A.", "Como preservar condições coletivas mais favoráveis e verificar o impacto real?"],
            ["Trabalho noturno", "Prorrogações do trabalho noturno são consideradas compensadas na forma legal.", "Como proteger a recuperação noturna depois de uma redução geral?"],
            ["Intervalo", "Deve ser observado ou indenizado, conforme a redação aplicável.", "Como evitar que dinheiro seja substituto integral do tempo de recuperação?"],
            ["Insalubridade", "O art. 60, parágrafo único, dispensa licença prévia para 12x36 em ambientes insalubres.", "O que saúde e segurança exigem antes de uma redação final?"],
        ], [doc.width * .18, doc.width * .39, doc.width * .43]
    ))
    story.append(Spacer(1, 6 * mm))
    story.append(card([
        p("A formulação precisa ser precisa", "Subhead"),
        p("Dizer que a Reforma Trabalhista reduziu salvaguardas é mais rigoroso do que afirmar que retirou todos os direitos. A vigência, a interpretação judicial e as cláusulas coletivas precisam ser lidas com o texto completo.", "Body"),
        p("A Súmula 444 do TST registra a validade excepcional do regime em lei ou instrumento coletivo e sua disciplina própria. Esta peça não substitui a triagem jurídica de um texto legislativo.", "BodyTight"),
    ], bg=PAPER_DEEP, border=OCHRE, padding=12))
    story.append(PageBreak())

    # 6. Evidence
    story += title_block("05 · evidência e limite", "Cautela é uma forma de proteção", "A literatura mobilizada pela nota ajuda a formular perguntas e salvaguardas. Ela não autoriza transformar achados de um setor em sentença sobre todos os regimes.")
    story.append(grid([
        [p("<b>Horas longas</b><br/><br/>Estudos sobre enfermagem associam jornadas muito longas e semanas extensas a fadiga, erros, burnout, insatisfação e intenção de sair.<br/><br/><font color='#6b716f'>Rogers, 2004 · Dall'Ora et al., 2015</font>", "BodyTight"),
         p("<b>Trabalho noturno</b><br/><br/>A IARC classificou o trabalho noturno como provavelmente carcinogênico para humanos, grupo 2A, com base na evidência disponível.<br/><br/><font color='#6b716f'>Perigo populacional não é previsão de risco individual.</font>", "BodyTight"),
         p("<b>Tempo social</b><br/><br/>Deslocamento, cuidado, sono, renda e tarefas domésticas mediam a folga e precisam entrar no desenho da política.<br/><br/><font color='#6b716f'>A escala deve ser lida junto com o posto e a vida fora dele.</font>", "BodyTight")]
    ], [doc.width / 3] * 3, [WHITE, BLUE, PINK], paddings=10))
    story.append(Spacer(1, 7 * mm))
    story.append(grid([
        [p("<b>A evidência permite dizer</b><br/><br/>+ horas longas e trabalho noturno podem pressionar sono, saúde e segurança;<br/><br/>+ o desenho da escala deve ser contextual;<br/><br/>+ uma redução geral precisa incluir regimes organizados por média.", "BodyTight"),
         p("<b>A evidência não permite dizer</b><br/><br/>+ que todos os trabalhadores 12x36 sofrem do mesmo modo;<br/><br/>+ que estudo hospitalar representa todos os setores;<br/><br/>+ que há prevalência nacional demonstrada ou causalidade entre 6x1 e 12x36.", "BodyTight")]
    ], [doc.width / 2] * 2, [GREEN, PAPER_DEEP], paddings=12))
    story.append(Spacer(1, 6 * mm))
    story.append(card([p("A nota chama de contextual o uso da evidência: ela apoia prudência, desenho e investigação posterior. Não é diagnóstico individual nem promessa de efeito uniforme.", "BodyTight")], bg=WHITE, border=LINE, padding=10))
    story.append(PageBreak())

    # 7. Counterproof and pillars
    story += title_block("06 · contraprova", "Uma boa regra precisa sobreviver às objeções mais fortes", "O regime pode ser preferido e ainda assim precisar acompanhar o teto geral. Serviços contínuos podem exigir transição e negociação, não uma exceção invisível.")
    story.append(data_table(
        ["Objeção", "Resposta de desenho"],
        [
            ["“As pessoas preferem 12x36.”", "A preferência é relevante. Ela não elimina o direito a um teto geral e a uma compensação que preserve a escolha sem naturalizar o excesso."],
            ["“Serviços contínuos não podem parar.”", "O texto precisa de transição setorial, dimensionamento, negociação e tempo para contratar ou reorganizar."],
            ["“42 horas ainda é menos que 44.”", "Sim. A proposta não apaga esse ganho; pergunta como acompanhar um teto que pode ficar abaixo de 42."],
            ["“36 horas já dão vários dias livres.”", "O calendário não mede sozinho recuperação. É preciso olhar o uso concreto da folga e a carga de cuidado."],
            ["“A negociação coletiva já resolve.”", "Ela é parte da solução. O piso legal impede que tempo e salário dependam apenas da assimetria de cada mesa."],
            ["“Uma regra nacional ficaria rígida.”", "O princípio pode ser nacional e a transição, setorial: teto, compensação, proteção salarial e mais favorável coletivo."],
        ], [doc.width * .31, doc.width * .69]
    ))
    story.append(Spacer(1, 6 * mm))
    story.append(p("Seis pilares de uma inclusão responsável", "Subhead"))
    pillars = [
        "<b>01 · incluir</b><br/>Mencionar expressamente o 12x36.", "<b>02 · devolver</b><br/>Compensar a diferença em tempo.", "<b>03 · proteger</b><br/>Não reduzir salário.",
        "<b>04 · limitar</b><br/>Não trocar tudo por dinheiro.", "<b>05 · preservar</b><br/>Manter o mais favorável coletivo.", "<b>06 · transicionar</b><br/>Implantar por setor e monitorar.",
    ]
    story.append(grid([p(item, "BodyTight") for item in pillars], [doc.width / 3] * 3, [PINK, GREEN, BLUE], paddings=8))
    story.append(PageBreak())

    # 8. Draft and path
    story += title_block("07 · proposta e caminho", "A fórmula é simples. A implementação não é.", "O texto abaixo é uma minuta conceitual para debate. A etapa institucional é parte da proposta, não um detalhe posterior.")
    story.append(card([
        p("Mesmo teto semanal por média + compensação em tempo + proteção salarial + negociação coletiva mais favorável.", "CoverDeck"),
    ], bg=GREEN, border=GREEN_DARK, padding=12))
    story.append(Spacer(1, 5 * mm))
    story.append(card([
        p("Minuta conceitual", "Subhead"),
        p("<b>§ 1º</b> A jornada organizada em regime de 12 (doze) horas de trabalho por 36 (trinta e seis) horas ininterruptas de descanso observará, na média do período de referência, o limite semanal constitucional ou legal aplicável.", "BodyTight"),
        p("<b>§ 2º</b> A diferença entre o limite semanal aplicável e a jornada média efetivamente realizada será compensada por descanso remunerado, redução de plantões ou equivalente redução de tempo, sem redução salarial.", "BodyTight"),
        p("<b>§ 3º</b> A compensação em tempo não será substituída integralmente por pagamento em dinheiro, sem prejuízo dos adicionais legais ou coletivos devidos.", "BodyTight"),
        p("<b>§ 4º</b> Permanecem preservadas as condições mais favoráveis previstas em convenção ou acordo coletivo de trabalho.", "BodyTight"),
    ], bg=WHITE, border=INK, padding=11))
    story.append(Spacer(1, 5 * mm))
    story.append(p("Seis passos antes da redação final", "Subhead"))
    story.append(data_table(
        ["01", "02", "03", "04", "05", "06"],
        [["Triagem jurídica", "Mapa setorial", "Escuta tripartite", "Boas práticas", "Mesa técnica", "Transição"]],
        [doc.width / 6] * 6
    ))
    story.append(Spacer(1, 4 * mm))
    story.append(p("Dados que ainda faltam: prevalência nacional por setor e turno; horas reais de deslocamento, cuidado e recuperação; efeitos de diferentes arranjos sobre segurança, renda e continuidade.", "Small"))
    story.append(PageBreak())

    # 9. CTA and author
    story += title_block("08 · encaminhamento", "Leve esta pergunta à política do trabalho", "Se você atua com políticas trabalhistas, serviço contínuo ou negociação coletiva, encaminhe esta peça para avaliação técnica.")
    cta = Table([[p("O pedido é concreto: estudar como incluir o 12x36 na redução da jornada, com compensação em tempo, salário preservado e transição negociada.", "CTA"), p("WhatsApp<br/><font size='14' color='#fff8ee'><b>" + WHATSAPP + "</b></font><br/><br/><font size='8' color='#f3dfe3'>Mensagem sugerida:<br/>Olá, Lua. Li a proposta sobre jornada 12x36 e direito ao tempo.</font>", "BodyWhite")]], colWidths=[doc.width * .64, doc.width * .36])
    cta.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BURGUNDY), ("BOX", (0, 0), (-1, -1), .6, BURGUNDY_DARK),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 13),
        ("RIGHTPADDING", (0, 0), (-1, -1), 13), ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
    ]))
    story.append(cta)
    story.append(Spacer(1, 8 * mm))
    story.append(p("O direito ao tempo não pode terminar na porta do plantão. Se o país reduzir a jornada, a escala 12x36 deve reduzir junto - por meio de folgas, menos plantões e proteção coletiva, não pela invisibilidade de uma exceção.", "CoverDeck"))
    story.append(Spacer(1, 4 * mm))
    story.append(grid([
        [p("<b>Sobre a autora</b><br/><br/>Lua Helena Moon Martins Cardoso é psicóloga hospitalar e socióloga de formação. A reflexão que originou esta nota começou em seu TCC sobre trabalho noturno e regime 12x36 e em sua experiência de um ano e quatro meses como controladora de acesso em jornada 12x36 noturna. É filiada ao PSOL Limeira e atua também com arquitetura contextual em IA.", "BodyTight"),
         p("<b>Autoria e limite institucional</b><br/><br/>Esta é uma contribuição técnica independente, de autoria de Lua Helena Moon Martins Cardoso. Não representa oficialmente o PSOL, qualquer mandato, órgão público, sindicato ou empregador, e não implica apoio, leitura, recebimento ou adoção por terceiros.", "BodyTight")]
    ], [doc.width / 2] * 2, [WHITE, PAPER_DEEP], paddings=11))
    story.append(Spacer(1, 6 * mm))
    if QR_PATH.exists():
        qr = Image(str(QR_PATH), width=31 * mm, height=31 * mm)
        qr_block = Table([[qr, p("<b>Leia e encaminhe a versão pública</b><br/><br/>A página preserva a leitura longa, as fontes, a minuta e o modo de impressão.<br/><br/><font size='7.5'>" + URL + "</font>", "BodyTight")]], colWidths=[38 * mm, doc.width - 38 * mm])
        qr_block.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), WHITE), ("BOX", (0, 0), (-1, -1), .6, LINE),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ]))
        story.append(qr_block)
    story.append(PageBreak())

    # 10. References
    story += title_block("09 · fontes e método", "A publicação termina onde a verificação começa", "A página e o artefato mantêm as fontes da nota técnica original e deixam visíveis os pontos que ainda dependem de pesquisa ou negociação.")
    refs = [
        "BRASIL. <b>Decreto-Lei nº 5.452/1943 - CLT</b>, especialmente arts. 59-A e 60. <font color='#551b33'>planalto.gov.br/ccivil_03/decreto-lei/del5452.htm</font>",
        "BRASIL. <b>Lei nº 13.467/2017</b>, Reforma Trabalhista. <font color='#551b33'>planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm</font>",
        "TRIBUNAL SUPERIOR DO TRABALHO. <b>Súmula 444 e jornada 12x36</b>. <font color='#551b33'>tst.jus.br/-/tst-reafirma-jurisprudencia-com-publicacao-de-sumula-sobre-jornada-12x36</font>",
        "CARDOSO, Lua Helena Moon Martins. <i>Trabalho noturno e regime 12/36: precarização da saúde e direitos dos vigias e vigilantes em Limeira (SP)</i>. TCC, conforme nota técnica original.",
        "ROGERS, A. E. et al. The working hours of hospital staff nurses and patient safety. <i>Health Affairs</i>, 23(4), 202-212, 2004. DOI 10.1377/hlthaff.23.4.202.",
        "DALL'ORA, C. et al. Characteristics of shift work and their relationship with fatigue and work performance. <i>BMJ Open</i>, 5, e008331, 2015. DOI 10.1136/bmjopen-2015-008331.",
        "JEONG, I. et al. Estudo sobre trabalho em turnos e saúde. <i>Safety and Health at Work</i>, 2019, conforme nota técnica original.",
        "MAURO, M. Y. C. et al. Estudo brasileiro sobre trabalho noturno. <i>Revista Enfermagem UERJ</i>, 2019. DOI 10.12957/reuerj.2019.31273.",
        "IARC. <i>Night Shift Work</i>, Monographs volume 124, 2020. <font color='#551b33'>iarc.who.int/news-events/iarc-monographs-volume-124-night-shift-work</font>",
        "NIOSH. <i>Training for Nurses on Shift Work and Long Work Hours</i>, 2015. <font color='#551b33'>cdc.gov/niosh/work-hour-training-for-nurses</font>",
        "PEGA, F. et al. Global burdens attributable to long working hours. <i>Environment International</i>, 2021. DOI 10.1016/j.envint.2021.106595.",
        "ANTUNES, R.; PRAUN, L. A sociedade dos adoecimentos no trabalho, 2015; e GALVÃO, A. et al. <i>Dossiê Reforma Trabalhista</i>, 2017, conforme nota técnica original.",
    ]
    story.append(Table([[p(f"{i + 1}. {ref}", "Ref")] for i, ref in enumerate(refs)], colWidths=[doc.width], style=TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 1.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
    ])))
    story.append(Spacer(1, 4 * mm))
    story.append(card([
        p("Nota de método", "Subhead"),
        p("A publicação não apresenta prevalência nacional do 12x36, não demonstra causalidade entre 6x1 e 12x36 e não transforma uma cláusula local em prova nacional. A minuta é conceitual. O próximo passo é a verificação jurídica, setorial e coletiva.", "BodyTight"),
        p("Fonte original completa: <font color='#551b33'>nota-tecnica-12x36-direito-ao-tempo.pdf</font><br/>Página pública: <font color='#551b33'>" + URL + "</font>", "Small"),
    ], bg=PAPER_DEEP, border=OCHRE, padding=10))
    story.append(Spacer(1, 7 * mm))
    story.append(p("Contribuição técnica independente · Lua Helena Moon Martins Cardoso · Limeira, julho de 2026", "Small"))

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build()
