<?php
session_start();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mixit - Cocktails</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Neonderthaw&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="logo-box">
            <img src="img/logo.png" alt="logo" class="logo">
            <h1>Mixit</h1>
        </div>
            
        <div class="burger-menu" id="burgerToggle">
            <span></span>
            <span></span>
            <span></span>
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
        <section class="card-container">
            <input type="search" placeholder="Rechercher" class="search-bar" id="searchBar" oninput="search()">

            <div class="filter-buttons">
                <button class="filter-btn" onclick="filterCategory('all')">Tous</button>
                <button class="filter-btn" onclick="filterCategory('Alcoholic')">Avec Alcool</button>
                <button class="filter-btn" onclick="filterCategory('Non alcoholic')">Sans Alcool</button>
            </div>

            <section class="cards" id="cocktails-api-container"></section>
        </section>

        <button class="floating-btn" id="boosterBtn">Ouvrir un Booster</button>

        <div class="booster-popup" id="boosterPopup">
            <button class="close-popup" id="closePopupBtn">&times;</button>
            
            <div class="booster-content">
                <img src="img/booster.png" alt="Booster" id="boosterImg" class="booster-img" data-tilt data-tilt-max="15">
            </div>
        </div>
    </main>

    <footer>

    </footer>

    <script defer src="https://unpkg.com/swup@4"></script>
    <script defer src="https://unpkg.com/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js"></script>
    <script defer type="module" src="https://unpkg.com/@google/model-viewer@latest/dist/model-viewer.min.js"></script>
    <script defer src="main.js"></script>
</body>
</html>