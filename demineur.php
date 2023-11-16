<?php
$rows = $_GET['rows'];
$columns = $_GET['columns'];
$bombs = $_GET['bombs'];
?>
<?php require("partials/head.php")?>
<body>
    <nav class="nav">
        <div class="text">
            <p>
                bombes :
            </p>
            <p>XX</p>
        </div>
        <div class="text">
            <p>
                timer :
            </p>
            <p>XX</p>
        </div>

    </nav>
    <div class="container">
        <div id="demineurGrid"></div>
    </div>
</body>
</html>