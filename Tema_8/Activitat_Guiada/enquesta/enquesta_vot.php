<?php
    //S'obté el fitxer on es van a guardar les dades
    $fichero = "resultado.txt";
    $contenido = file($fichero);

    //Es guarda en un array tota l'informació arreplegada
    //per a el seu ús mes avant
    $array = explode("@", $contenido[0]);

    $rea = $array[0];
    $bar = $array[1];
    $atl = $array[2];
    $val = $array[3];

    $voto = $_GET["voto"];

    //Switch Case per realitzar acció segons el vot triat
    switch($voto) {
        case 0:
            ++$rea;
        break;

        case 1:
            ++$bar;
        break;

        case 2:
            ++$atl;
        break;

        case 3:
            ++$val;
        break;
    }

    /*foreach ($array as $contenido){
        echo $contenido;
    }
    echo $val;*/

    $insertvoto = $rea."@".$bar."@".$atl."@".$val.'@';
    $fp = fopen($fichero, "w");
    fputs($fp, $insertvoto);
    fclose($fp);

    //Càlcul del percentatge dels vots
    $denominador = (int)$rea + (int)$bar + (int)$atl + (int)$val;

    $quantRea = 100 * round($rea / $denominador, 2);
    $quantBar = 100 * round($bar / $denominador, 2);
    $quantAtl = 100 * round($atl / $denominador, 2);
    $quantVal = 100 * round($val / $denominador, 2);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultats</title>
</head>
<body>
    <h2>Resultado:</h2>
    <table>
        <tr>
            <td>Real Madrid:</td>
            <td>
                <img src="./img/barrita.png" width="<?= $quantRea; ?>" height="20"><?= $quantRea; ?>%
            <td>
        </tr>
        <tr>
            <td>Barcelona:</td>
            <td>
                <img src="./img/barrita.png" width="<?= $quantBar; ?>" height="20"><?= $quantBar; ?>%
            <td>
        </tr>
        <tr>
            <td>Atlético de Madrid:</td>
            <td>
                <img src="./img/barrita.png" width="<?= $quantAtl; ?>" height="20"><?= $quantAtl; ?>%
            <td>
        </tr>
        <tr>
            <td>València:</td>
            <td>
                <img src="./img/barrita.png" width="<?= $quantVal; ?>" height="20"><?= $quantVal; ?>%
            <td>
        </tr>
    </table>
</body>
</html>