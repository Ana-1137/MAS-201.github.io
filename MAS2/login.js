$(document).ready(function () {
    $('#form').find('input, textarea').on('keyup blur focus', function (e) {
        var $this = $(this),
            label = $this.prev('label');

        if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.addClass('active highlight');
            }
        } else if (e.type === 'blur') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.removeClass('highlight');
            }
        } else if (e.type === 'focus') {
            if ($this.val() === '') {
                label.removeClass('highlight');
            } else {
                label.addClass('highlight');
            }
        }
    });

    $('.tab a').on('click', function (e) {
        e.preventDefault();
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        target = $(this).attr('href');
        $('.tab-content > div').not(target).hide();
        $(target).fadeIn(800);
    });

    function handleLogin() {
        const emailInput = $('#loginEmail').val();
        const passwordInput = $('#loginPassword').val();

        // Simples validação de login (por favor, use uma solução mais segura em um ambiente de produção)
        if (emailInput === '1@a' && passwordInput === '123') {
            localStorage.setItem('loggedInUser', emailInput);
            window.location.href = 'homepage.html';
        } else {
            alert('Login falhou. Verifique suas credenciais.');
        }
    }

    function handleSignup() {
        const firstName = $('#first_name').val();
        const lastName = $('#last_name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const password = $('#password').val();

        // Recupere os detalhes armazenados no localStorage
        const storedDetails = localStorage.getItem('userDetails');

        if (storedDetails) {
            // Se existirem detalhes armazenados, verifique duplicatas
            const storedUsers = JSON.parse(storedDetails);

            // Verifique duplicatas de email
            const duplicateEmail = storedUsers.find(user => user.email === email);
            if (duplicateEmail) {
                alert('Já existe uma conta com este email.');
                return;
            }

            // Verifique duplicatas de número de telefone
            const duplicatePhone = storedUsers.find(user => user.phone === phone);
            if (duplicatePhone) {
                alert('Já existe uma conta com este número de telefone.');
                return;
            }
        }

        // Crie um objeto com os detalhes do usuário
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password
        };

        // Armazene os detalhes do usuário no localStorage
        const userDetails = storedDetails ? JSON.parse(storedDetails) : [];
        userDetails.push(user);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        alert('Conta criada com sucesso!');

        // Limpe os campos de registro após o sucesso
        $('#first_name, #last_name, #email, #phone, #password').val('');
    }

    function handleSignup() {
        const firstName = $('#first_name').val();
        const lastName = $('#last_name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const password = $('#password').val();

        // Recupere os detalhes armazenados no localStorage
        const storedDetails = localStorage.getItem('userDetails');

        if (storedDetails) {
            // Se existirem detalhes armazenados, verifique duplicatas
            const storedUsers = JSON.parse(storedDetails);

            // Verifique duplicatas de email
            const duplicateEmail = storedUsers.find(user => user.email === email);
            if (duplicateEmail) {
                alert('Já existe uma conta com este email.');
                return;
            }

            // Verifique duplicatas de número de telefone
            const duplicatePhone = storedUsers.find(user => user.phone === phone);
            if (duplicatePhone) {
                alert('Já existe uma conta com este número de telefone.');
                return;
            }
        }

        // Crie um objeto com os detalhes do usuário
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password
        };

        // Armazene os detalhes do usuário no localStorage
        const userDetails = storedDetails ? JSON.parse(storedDetails) : [];
        userDetails.push(user);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        alert('Conta criada com sucesso!');

        // Limpe os campos de registro após o sucesso
        $('#first_name, #last_name, #email, #phone, #password').val('');
    }


    // Adicione manipuladores de eventos aos botões
    $('#loginBtn').on('click', handleLogin);
    $('#signupBtn').on('click', handleSignup);
});
