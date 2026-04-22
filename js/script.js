/**
         * Animação suave de entrada dos elementos ao rolar a página.
         * Usa Intersection Observer (API nativa, sem bibliotecas externas).
         */
        document.addEventListener('DOMContentLoaded', function() {

            // Observa os elementos com a classe .fade-in
            const elementosAnimados = document.querySelectorAll('.fade-in');

            const observador = new IntersectionObserver(function(entradas) {
                entradas.forEach(function(entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add('visivel');
                        // Para de observar depois que apareceu (melhor performance)
                        observador.unobserve(entrada.target);
                    }
                });
            }, {
                threshold: 0.1,       // Dispara quando 10% do elemento está visível
                rootMargin: '0px 0px -50px 0px'  // Começa um pouco antes de entrar na tela
            });

            elementosAnimados.forEach(function(elemento) {
                observador.observe(elemento);
            });

            /**
             * Sombra no header ao rolar para baixo
             * Melhora a separação visual entre o header e o conteúdo
             */
            const header = document.querySelector('.header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 20) {
                    header.style.boxShadow = 'var(--sombra-suave)';
                } else {
                    header.style.boxShadow = 'none';
                }
            });

            /**
             * Rolagem suave ao clicar em links internos (#ancora)
             * O CSS já faz isso via scroll-behavior: smooth, este JS garante
             * compatibilidade com navegadores mais antigos.
             */
            document.querySelectorAll('a[href^="#"]').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    const destino = document.querySelector(this.getAttribute('href'));
                    if (destino) {
                        e.preventDefault();
                        const alturaHeader = header.offsetHeight;
                        const posicao = destino.offsetTop - alturaHeader;
                        window.scrollTo({
                            top: posicao,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });