<?php
session_start();

try {
    // Connexion a la BDD
    $pdo = new PDO('mysql:host=localhost;port=8889;dbname=mixit;charset=utf8mb4', 'root', 'root');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Si erreur
    echo ("Erreur lors de la connexion a la BDD : " . $e->getMessage());
}

$error = null;
$success = null;

// Verification de l'input de l'user
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Formatage du texte
    $pseudo = trim($_POST['pseudo']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $passwordOut = trim($_POST['password2']);

    // Vérification que les champs soient remplis
    if (!empty($pseudo) && !empty($email) && !empty($password) && !empty($passwordOut)) {

        // Vérification des 2 MDP
        if ($password === $passwordOut) {

            // Hashage du mdp
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            // Ajout d'un nouvel user
            $request = $pdo->prepare("INSERT INTO user (pseudo, email, password) VALUES (:pseudo, :email, :password)");
            $request->execute([
                    'pseudo' => $pseudo,
                    'email' => $email,
                    'password' => $hashedPassword
            ]);

            // Message succès + redirection
            $_SESSION['success_message'] = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
            header('Location: login.php');
            exit;

        } else {
            $error = "Les mots de passe ne correspondent pas.";
        }
    } else {
        $error = "Veuillez renseigner tous les champs.";
    }
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mixit - Inscription</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Neonderthaw&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet">
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
    <form action="" method="POST" class="form" id="inscriptionForm">

        <div class="message-error">
            <ul id="errorList"></ul>
        </div>
        <div class="message-success">
            Validation en cours...
        </div>

        <?php if ($error): ?>
            <p style="color: #ff4d4d; text-align: center;"><?php echo $error; ?></p>
        <?php endif; ?>

        <div>
            <input type="text" name="pseudo" id="pseudo" class="form-checkbox" placeholder="Pseudo" value="<?php echo isset($_POST['pseudo']) ? htmlspecialchars($_POST['pseudo']) : ''; ?>" required>
        </div>

        <div>
            <input type="email" name="email" id="email" class="form-checkbox" placeholder="E-mail" value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>" required>
        </div>

        <div>
            <input type="password" name="password" id="password" class="form-checkbox" placeholder="Mot de passe"
                   required>
        </div>

        <div>
            <input type="password" name="password2" id="password2" class="form-checkbox" placeholder="Confirmation MDP"
                   required>
        </div>

        <button type="submit" class="submit-button">S'inscrire</button>
        <p style="text-align: center; margin-top: 10px;">Déjà un compte ? <a href="login.php" style="color: white;">Se connecter</a></p>
    </form>
</main>

<script defer src="https://unpkg.com/swup@4"></script>
<script defer src="https://unpkg.com/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>
<script defer type="module" src="https://unpkg.com/@google/model-viewer@latest/dist/model-viewer.min.js"></script>
<script defer src="main.js"></script>
</body>
</html>