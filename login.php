<?php
session_start();

try {
    // Connexion a la BDD
    $pdo = new PDO('mysql:host=localhost;port=8889;dbname=mixit;charset=utf8mb4', 'root', 'root');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur lors de la connexion a la BDD : " . $e->getMessage();
    exit;
}

// Verification de l'input de l'user
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Formatage du texte
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Vérification que les champs soient remplis
    if (!empty($email) && !empty($password)) {

        // Chercher si l'email existe
        $request = $pdo->prepare("SELECT id, pseudo, password FROM user WHERE email = :email");
        $request->execute([
                'email' => $email
        ]);

        // Si l'user existe on recupère ses données
        $user = $request->fetch(PDO::FETCH_ASSOC);

        // On vérifie que le MDP et l'email matchent
        if ($user && password_verify($password, $user['password'])) {

            // Si c'est bon, on enregistre l'ID et le pseudo dans la session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['pseudo'] = $user['pseudo'];

            // Redirection
            header('Location: index.php');
            exit;

        } else {
            // Si pas email ou MDP
            echo "Email ou mot de passe incorrect.";
        }
    } else {
        echo "Veuillez remplir tous les champs.";
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mixit - Connexion</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Neonderthaw&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
<header>
    <div class="logo-box">
        <img src="img/logo.png" alt="logo" class="logo">
    </div>
    <h1>Mixit</h1>
    <article class="menu">
        <a href="index.php" class="categorie">HOME</a>
        <a href="cards.php" class="categorie">CARDS</a>

        <?php if (isset($_SESSION['user_id'])): ?>
            <span class="categorie" style="color: #ffcc00;">Salut, <?php echo htmlspecialchars($_SESSION['pseudo']); ?></span>
            <a href="logout.php" class="categorie" data-no-swup>LOGOUT</a>
        <?php else: ?>
            <a href="profile.php" class="categorie">S'INSCRIRE</a>
            <a href="login.php" class="categorie">LOGIN</a>
        <?php endif; ?>
    </article>
</header>

<main id="swup" class="transition-fade">
    <form action="" method="POST" class="form" id="loginForm">

        <?php if (isset($_SESSION['success_message'])): ?>
            <p style="color: #4CAF50; text-align: center;">
                <?php
                echo $_SESSION['success_message'];
                ?>
            </p>
        <?php endif; ?>

        <div>
            <input type="email" name="email" id="email" class="form-checkbox" placeholder="E-mail" required>
        </div>

        <div>
            <input type="password" name="password" id="password" class="form-checkbox" placeholder="Mot de passe" required>
        </div>

        <button type="submit" class="submit-button">Se connecter</button>
    </form>
</main>

<script defer src="https://unpkg.com/swup@4"></script>
<script defer src="https://unpkg.com/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>
<script defer type="module" src="https://unpkg.com/@google/model-viewer@latest/dist/model-viewer.min.js"></script>
<script defer src="main.js"></script>
</body>
</html>