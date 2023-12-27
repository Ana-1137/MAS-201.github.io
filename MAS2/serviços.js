// Função para verificar se o serviço já está na local storage
function isServiceInCart(serviceName, userCart) {
    return userCart.some(service => service.serviceName === serviceName);
}
// Função para adicionar um produto ao carrinho
function addProduct(productId) {
    var added = $('#price' + productId).data('added');

    if (!added) {
        var serviceName = $('#serviceName' + productId).text().trim();
        var price = parseFloat($('#price' + productId).text().replace('€', '').trim());

        // Obter o carrinho do usuário da local storage
        var loggedInUser = localStorage.getItem('loggedInUser');
        var userCart = JSON.parse(localStorage.getItem('userCart')) || {};

        if (loggedInUser) {
            userCart[loggedInUser] = userCart[loggedInUser] || [];

            // Verificar se o serviço já está no carrinho
            if (isServiceInCart(serviceName, userCart[loggedInUser])) {
                alert('Este serviço já foi adicionado ao carrinho.');
                return;
            }

            // Adicionar o serviço ao carrinho como um objeto
            userCart[loggedInUser].push({ serviceName: serviceName, price: price });

            // Atualizar a local storage
            localStorage.setItem('userCart', JSON.stringify(userCart));

            total += price;
            $('#total').text(total.toFixed(2) + "€");
            $('#price' + productId).data('added', true);
        } else {
            alert('Usuário não autenticado. Faça o login para adicionar serviços ao carrinho.');
        }
    } else {
        alert('Este serviço já foi adicionado ao carrinho.');
    }
}

$(document).ready(function () {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        // Recupera os produtos do carrinho da local storage associada ao utilizador
        var userCart = JSON.parse(localStorage.getItem('userCart')) || {};
        var cartItems = userCart[loggedInUser] || [];

        // Marca os produtos como adicionados
        cartItems.forEach(function (service) {
            // Atualizar total
            total += service.price;
            $('#total').text(total.toFixed(2) + "€");

            // Marcar serviço como adicionado
            $('#price' + service.productId).data('added', true);
        });
    }
});

// Função para limpar o carrinho
function clean() {
    total = 0.00;
    $('#total').text(total.toFixed(2) + "€");

    // Limpa os produtos da localStorage associada ao utilizador
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        var userCart = JSON.parse(localStorage.getItem('userCart')) || {};
        userCart[loggedInUser] = [];
        localStorage.setItem('userCart', JSON.stringify(userCart));
    }

    $('[data-added="true"]').each(function () {
        $(this).data('added', false);
        $(this).closest('.bg-white').find('.cart-btn').text('Adicionar');
    });

    alert('Carrinho limpo com sucesso.');
}

// Verifica se o usuário está logado ao carregar a página
$(document).ready(function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const logoutLink = $('#logoutLink');
    const loginLink = $('#loginLink');

    if (loggedInUser) {
        logoutLink.css('display', 'block');
        loginLink.css('display', 'none');

        // Recupera os produtos do carrinho da localStorage associada ao utilizador
        var userCart = JSON.parse(localStorage.getItem('userCart')) || {};
        var cartItems = userCart[loggedInUser] || [];

        // Marca os produtos como adicionados
        cartItems.forEach(function (productId) {
            $('#price' + productId).data('added', true);
        });
    } else {
        logoutLink.css('display', 'none');
        loginLink.css('display', 'block');
    }
});

function handleLogout() {
    // Limpa o localStorage
    localStorage.removeItem('loggedInUser');

    // Oculta a opção de logout e exibe a opção de login
    const logoutLink = $('#logoutLink');
    const loginLink = $('#loginLink');
    logoutLink.css('display', 'none');
    loginLink.css('display', 'block');

    // Chama a função para redefinir o valor total
    resetTotal();
}
