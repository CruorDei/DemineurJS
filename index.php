<?php require("partials/head.php") ?>

<body>
    <div class="container">
    <form action="demineur.php" method="GET">
        <label for="rows">Nombre de lignes :</label>
        <input type="number" id="rows" name="rows" required value="10">

        <label for="column">Nombre de colonnes :</label>
        <input type="number" id="columns" name="columns" required value="10">

        <label for="bombs">Nombre de bombes :</label>
        <input type="number" id="bombs" name="bombs" required value="10">

        <button type="submit">Jouer au démineur</button>
    </div>
    </form>
</body>
