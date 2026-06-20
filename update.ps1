$html = Get-Content -Raw -Path index.html

# 1. Body & fixed bg
$html = $html -replace '<body class="bg-background text-on-surface font-body-md overflow-x-hidden">', '<body class="bg-on-background text-white font-body-md overflow-x-hidden">`n<!-- Fixed Background -->`n<div class="fixed inset-0 z-[-1] pointer-events-none">`n    <div class="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat bg-fixed" style="background-image: url(''HomeBg.png'');"></div>`n    <div class="absolute inset-0 bg-on-background/80"></div>`n</div>'

# 2. Fade overlay
$html = $html -replace 'bg-background z-\[9999\]', 'bg-on-background z-[9999]'

# 3. Header colors
$html = $html -replace 'bg-surface/90 backdrop-blur-md border-b border-outline-variant', 'bg-on-background/80 backdrop-blur-md border-b border-white/10'
$html = $html -replace 'text-on-surface-variant hover:text-primary', 'text-white/80 hover:text-primary'

# 4. Hero section (remove inline bg)
$html = $html -replace '<section class="relative min-h-\[90vh\] flex items-center overflow-hidden bg-on-background transition-all duration-1000 opacity-100" id="home">', '<section class="relative min-h-[90vh] flex items-center overflow-hidden transition-all duration-1000 opacity-100" id="home">'
$html = $html -replace '(?s)<div class="absolute inset-0 opacity-40">\s*<div class="w-full h-full bg-cover bg-center" style="background-image: url\(''HomeBg.png''\);"></div>\s*</div>', ''

# 5. Services section (remove bg-on-background)
$html = $html -replace '<section class="py-32 max-w-max-width mx-auto px-margin-desktop transition-all duration-1000 opacity-100 bg-on-background text-white" id="services">', '<section class="py-32 max-w-max-width mx-auto px-margin-desktop transition-all duration-1000 opacity-100" id="services">'

# 6. About Us section
$html = $html -replace '<section class="bg-surface-container-low py-32 overflow-hidden transition-all duration-1000 opacity-100" id="about">', '<section class="py-32 overflow-hidden transition-all duration-1000 opacity-100" id="about">'
$html = $html -replace '<div class="absolute top-12 -left-12 p-8 bg-white shadow-xl z-20 rounded border border-outline-variant/30 hidden md:block">', '<div class="absolute top-12 -left-12 p-8 bg-on-background/90 backdrop-blur shadow-xl z-20 rounded border border-white/10 hidden md:block">'
$html = $html -replace 'text-on-surface-variant leading-relaxed', 'text-white/70 leading-relaxed'
$html = $html -replace 'text-on-surface-variant', 'text-white/70'
$html = $html -replace 'text-on-surface', 'text-white'
$html = $html -replace 'bg-on-background text-white px-8 py-4 font-bold hover:bg-primary transition-all', 'bg-white/10 text-white px-8 py-4 font-bold hover:bg-primary transition-all border border-white/10'

# 8. Testimonials section
$html = $html -replace '<section class="py-24 bg-surface transition-all duration-1000 opacity-100">', '<section class="py-24 transition-all duration-1000 opacity-100 border-t border-white/10">'
$html = $html -replace 'bg-secondary/20', 'bg-white/10 text-white'

# 9. Contact section
$html = $html -replace '<section class="relative py-32 bg-primary transition-all duration-1000 opacity-100" id="contact">', '<section class="relative py-32 transition-all duration-1000 opacity-100 border-t border-white/10" id="contact">'
$html = $html -replace '<a class="bg-white text-primary px-12 py-5 rounded font-bold hover:bg-surface-container-low transition-all text-lg shadow-xl rounded-xl" href="#contact">', '<a class="bg-primary text-white px-12 py-5 rounded font-bold hover:bg-primary-container transition-all text-lg shadow-xl rounded-xl" href="#contact">'
$html = $html -replace 'text-on-primary', 'text-white'

# 10. Footer
$html = $html -replace '<footer class="bg-surface-container-highest dark:bg-on-background py-12 border-t border-outline-variant">', '<footer class="py-12 border-t border-white/10 bg-on-background/40">'
$html = $html -replace 'dark:text-surface-variant', 'text-white/70'
$html = $html -replace 'dark:text-surface', 'text-white'
$html = $html -replace 'bg-on-surface/5', 'bg-white/10'

Set-Content -Path index.html -Value $html
