<?php
session_start();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mixit</title>
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
        <model-viewer 
        alt="martini" 
        src="3D/martini.glb" 
        shadow-intensity="1" 
        camera-controls 
        touch-action="pan-y"
        environment-image="neutral" 
        exposure="1"
        auto-rotate>
        </model-viewer>
    </main>

    <script defer src="https://unpkg.com/swup@4"></script>
    <script defer src="https://unpkg.com/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>
    <script defer type="module" src="https://unpkg.com/@google/model-viewer@latest/dist/model-viewer.min.js"></script>
    <script defer src="main.js"></script>
</body>
</html>