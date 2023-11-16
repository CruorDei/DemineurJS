<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <script defer>
    <?php if (isset($rows)) : ?>
        var rows = '<?php echo $rows; ?>';
        console.log("Nombre de lignes :", rows);
    <?php endif; ?>
    <?php if (isset($columns)) : ?>
        var columns = <?php echo $columns; ?>;
        console.log("Nombre de colonnes :", columns);
    <?php endif; ?>
    <?php if (isset($bombs)) : ?>
        var bombs = <?php echo $bombs; ?>;
        console.log("Nombre de bombes :", bombs);
    <?php endif; ?>
</script>
    <script type="module" src="js/script.js" defer></script>
    <script type="module" src="js/Demineur.js" defer></script>
    <title>Demineur</title>
</head>