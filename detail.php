<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mixit - Détail</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Neonderthaw&family=Roboto:wght@100..900&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="logo-box">
            <img src="img/logo.png" alt="logo" class="logo">
            <h1>Mixit</h1>
        </div>
        <article class="menu" id="navMenu">
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
        <link rel="stylesheet" href="css/detail.css">
        
        <section class="detail-container" id="cocktail-detail-container">
            </section>
    </main>

    <script defer src="https://unpkg.com/swup@4"></script>
    <script defer src="https://unpkg.com/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>
    <script defer src="main.js"></script>
</body>
</html>