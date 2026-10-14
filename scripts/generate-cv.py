"""Generates public/cv/Mubashir-Sohail-CV.pdf from the verified details in data/personal.ts.
Run: python3 scripts/generate-cv.py   (requires: pip install reportlab)
Replace the output with your own CV any time — the site just links to that path."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable

RED, GOLD, INK, MUTED = HexColor("#A4161A"), HexColor("#9a7b17"), HexColor("#111111"), HexColor("#444444")
S = lambda n, **k: ParagraphStyle(n, fontName=k.pop("f", "Helvetica"), textColor=k.pop("c", INK), **k)
name, title = S("n", fontSize=26, leading=30, f="Helvetica-Bold"), S("t", fontSize=12, leading=16, c=RED, f="Helvetica-Bold")
meta, h = S("m", fontSize=9.5, leading=14, c=MUTED), S("h", fontSize=11, leading=14, c=GOLD, f="Helvetica-Bold", spaceBefore=14, spaceAfter=4)
body, bullet = S("b", fontSize=10, leading=14.5), S("bl", fontSize=10, leading=14.5, leftIndent=12, bulletIndent=0)

def rule(): return HRFlowable(width="100%", thickness=0.6, color=HexColor("#cccccc"), spaceBefore=2, spaceAfter=6)

doc = SimpleDocTemplate("public/cv/Mubashir-Sohail-CV.pdf", pagesize=A4, leftMargin=20*mm, rightMargin=20*mm,
                        topMargin=18*mm, bottomMargin=18*mm, title="Mubashir Sohail — CV", author="Mubashir Sohail")
E = [
  Paragraph("Mubashir Sohail", name), Paragraph("Full-Stack &amp; AI Engineer", title), Spacer(1, 4),
  Paragraph("Pakistan &nbsp;|&nbsp; +92 304 3600066 &nbsp;|&nbsp; deo.mubashirsohail@gmail.com", meta),
  Paragraph("linkedin.com/in/themubashirsohail &nbsp;|&nbsp; github.com/mubashirsohail", meta),
  Paragraph("PROFESSIONAL SUMMARY", h), rule(),
  Paragraph("Full-Stack &amp; AI Engineer with 5+ years of experience building scalable web applications, intelligent AI solutions, "
            "cloud-native systems, and automated workflows. Skilled in React, Next.js, JavaScript, Python, PHP, Data Science, Machine "
            "Learning, Deep Learning, Generative AI, AI Agent Development, AWS, Vercel, Docker, Kubernetes, and n8n. Passionate about "
            "transforming complex business requirements into practical, scalable, and production-ready technology solutions.", body),
  Paragraph("TECHNICAL SKILLS", h), rule(),
]
for k, v in [("Full-Stack Development", "HTML, Tailwind CSS, JavaScript, React, Next.js, Python, PHP"),
             ("Artificial Intelligence", "Data Science, Machine Learning, Deep Learning, Generative AI, AI Agent Development"),
             ("Cloud Engineering", "AWS, Vercel, Cloud Deployment"),
             ("DevOps &amp; Containers", "Docker, Kubernetes, Containerization"),
             ("Automation", "n8n, Workflow Automation, API Integration")]:
    E.append(Paragraph(f"<b>{k}:</b> {v}", body))
E += [Paragraph("PROFESSIONAL EXPERIENCE", h), rule(),
      Paragraph("<b>Full-Stack &amp; AI Engineer</b> — Mansha Virtual Institute of Technology (MIVT) &nbsp;&nbsp;<font color='#444444'>2021 – Present</font>", body), Spacer(1, 3)]
for t in ["Develop and maintain full-stack web applications using modern frontend and backend technologies.",
          "Build responsive and user-focused interfaces using HTML, Tailwind CSS, JavaScript, React, and Next.js.",
          "Develop backend services, APIs, and application logic using Python and PHP.",
          "Design and implement Data Science, Machine Learning, Deep Learning, and Generative AI solutions.",
          "Develop AI agents and intelligent workflows to automate processes and solve practical business problems.",
          "Deploy and manage applications using AWS and Vercel.",
          "Use Docker and containerization to improve application portability, consistency, and deployment workflows.",
          "Work with Kubernetes and cloud-native technologies to support scalable application environments.",
          "Create automated workflows and system integrations using n8n and APIs."]:
    E.append(Paragraph(t, bullet, bulletText="•"))
E += [Paragraph("EDUCATION", h), rule(), Paragraph("<b>Master of Computer Science</b> — completed 2021", body)]
doc.build(E)
print("wrote public/cv/Mubashir-Sohail-CV.pdf")
