# ex: set ts=8:

TEX=	*.tex
PDF=	*.pdf
LATEX=	pdflatex

all:
	# Run latex twice so that we get tables of contents, etc.
	$(LATEX) $(TEX)
	$(LATEX) $(TEX)

clean:
	@-rm -f *.aux *.log *.out *.toc *.snm *.nav *.vrb
