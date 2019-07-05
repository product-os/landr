.PHONY: icons

icons: skeleton/android-icon-192x192.png \
	skeleton/android-icon-144x144.png \
	skeleton/android-icon-96x96.png \
	skeleton/android-icon-72x72.png \
	skeleton/android-icon-48x48.png \
	skeleton/android-icon-36x36.png \
	skeleton/apple-icon-180x180.png \
	skeleton/apple-icon-152x152.png \
	skeleton/apple-icon-144x144.png \
	skeleton/apple-icon-120x120.png \
	skeleton/apple-icon-114x114.png \
	skeleton/apple-icon-76x76.png \
	skeleton/apple-icon-72x72.png \
	skeleton/apple-icon-60x60.png \
	skeleton/apple-icon-57x57.png \
	skeleton/apple-icon-precomposed.png \
	skeleton/apple-icon.png \
	skeleton/favicon.ico \
	skeleton/favicon-64x64.png \
	skeleton/favicon-48x48.png \
	skeleton/favicon-32x32.png \
	skeleton/favicon-24x24.png \
	skeleton/favicon-16x16.png \
	skeleton/ms-icon-310x310.png \
	skeleton/ms-icon-150x150.png \
	skeleton/ms-icon-144x144.png \
	skeleton/ms-icon-70x70.png

skeleton/android-icon-%.png: logo.png
	convert -resize $(basename $(subst skeleton/android-icon-,,$@)) $< $@

skeleton/apple-icon-%.png: logo.png
	convert -resize $(basename $(subst skeleton/apple-icon-,,$@)) $< $@

skeleton/apple-icon-precomposed.png: logo.png
	convert -resize 100x100 $< $@

skeleton/apple-icon.png: logo.png
	convert -resize 100x100 $< $@

skeleton/favicon-%.png: logo.png
	convert -resize $(basename $(subst skeleton/favicon-,,$@)) $< $@

skeleton/favicon.ico: skeleton/favicon-64x64.png \
	skeleton/favicon-48x48.png \
	skeleton/favicon-32x32.png \
	skeleton/favicon-24x24.png \
	skeleton/favicon-16x16.png
	convert $^ $@

skeleton/ms-icon-%.png: logo.png
	convert -resize $(basename $(subst skeleton/ms-icon-,,$@)) $< $@
