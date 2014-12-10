/**
 * Created by rdehu on 09/12/14.
 */
var moteur = function () {
    this.tab = new Array(25);
    this.J1;
    this.J2;
    this.Jcourant;
    this.lastcoup;
    this.nbpj1;
    this.nbpj2;

    this.init_plateau = function () {
        this.Jcourant = 1;
        this.lastcoup=00000;
        for (var i = 0; i < 25; i++) {
            this.tab[i] = 0;
        }
    };

    this.get_pos = function (column, line) {
        return 5 * line + column;
    };

    this.place_marble = function (column, line) {
        var pos = this.get_pos(column, line);
        var r = 0;
        if (this.tab[pos] == 0) {
            this.tab[pos] = this.Jcourant;
            r = 1;
        }
        return r;
    };

    this.changetour = function (){
        if(this.Jcourant===1){
            this.Jcourant=2;
        }
        else{
            this.Jcourant=1;
        }
    };

    this.distance_cases = function (colonne_depart, ligne_depart, colonne_arrivee, ligne_arrivee) {

        if(colonne_arrivee != colonne_depart && ligne_arrivee != ligne_depart)
        {
            if((colonne_arrivee >= colonne_depart) && (ligne_arrivee >= ligne_depart))
            {
                if ((colonne_arrivee - colonne_depart) != (ligne_arrivee - ligne_depart))
                {

                    return 0;
                }
            }
            if((colonne_arrivee >= colonne_depart) && (ligne_arrivee < ligne_depart))
            {
                if ((colonne_arrivee - colonne_depart) != (ligne_depart - ligne_arrivee))
                {

                    return 0;
                }
            }
            if((colonne_arrivee < colonne_depart) && (ligne_arrivee >= ligne_depart))
            {
                if ((colonne_depart - colonne_arrivee) != (ligne_arrivee - ligne_depart))
                {

                    return 0;
                }
            }
            if((colonne_arrivee < colonne_depart) && (ligne_arrivee < ligne_depart))
            {
                if ((colonne_depart - colonne_arrivee) != (ligne_depart - ligne_arrivee))
                {

                    return 0;
                }
            }
        }

        if (colonne_arrivee > colonne_depart)
            return (colonne_arrivee - colonne_depart);
        else if(colonne_depart == colonne_arrivee)
        {
            if(ligne_arrivee >= ligne_depart)
            {
                return(ligne_arrivee - ligne_depart);
            }
            else
            {
                return(ligne_depart - ligne_arrivee);
            }
        }
        else
        {
            return (colonne_depart - colonne_arrivee);
        }
    };

    this.ligne_droite = function (colonne_depart, ligne_depart, colonne_arrivee, ligne_arrivee) {
        if (colonne_arrivee == colonne_depart) {
            if((ligne_arrivee==ligne_depart+1)||(ligne_arrivee==ligne_depart-1)){
                return true;
            }
            else {
                for (var i = ligne_depart + 1; i < ligne_arrivee; i++) {
                    if (this.tab[this.get_pos(colonne_depart, i)] != 0) {
                        return false;
                    }
                }
            }
        }
        else if (ligne_arrivee == ligne_depart) {
            if((colonne_arrivee==colonne_depart+1)||(colonne_arrivee==colonne_depart-1)){
                return true;
            }
            else {
                for (var i = colonne_depart + 1; i < colonne_arrivee; i++) {
                    if (this.tab[this.get_pos(i, ligne_depart)] != 0) {
                        return false;
                    }
                }
            }
        }
        else {
            if((ligne_arrivee==ligne_depart+1)||(ligne_arrivee==ligne_depart-1)){
                if((colonne_arrivee==colonne_depart+1)||(colonne_arrivee==colonne_depart-1)){
                    return true;
                }
            }

            else {

                for (var i = colonne_depart + 1; i < colonne_arrivee; i++) {

                    if (this.tab[this.get_pos(i, i)] != 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    };



    this.get_tete_pile = function (column, line) {
        var position = this.get_pos(column, line);
        var chaine = this.tab[position].toString();
        return parseInt(chaine.charAt(0));

    };


    this.coup_possible = function (nombre_pions, colonne_depart, ligne_depart, colonne_arrivee, ligne_arrivee) {


        if (this.tab[this.get_pos(colonne_depart, ligne_depart)] != 0 && this.tab[this.get_pos(colonne_arrivee, ligne_arrivee)] != 0) {

                if (this.ligne_droite(colonne_depart, ligne_depart, colonne_arrivee, ligne_arrivee)) // si rien n'obstrue la voie
                {
                    if (this.tab[this.get_pos(colonne_arrivee, ligne_arrivee)].toString().length == this.distance_cases(colonne_depart,ligne_depart,colonne_arrivee,ligne_arrivee))  // si la distance = hauteur pile
                    {
                        if (nombre_pions.toString() != this.lastcoup.toString().charAt(0) || this.get_pos(colonne_arrivee, ligne_arrivee).toString() != this.lastcoup.toString().substring(1, 2) || this.get_pos(colonne_depart, ligne_depart).toString() != this.lastcoup.toString().substring(3, 4)) // coup différent de celui d'avant
                        {
                            return true;
                        }
                    }
                }
        }
        return false;
    };

    this.deplacer_tour = function(nombre_pions, colonne_depart, ligne_depart, colonne_arrivee, ligne_arrivee)
    {
        if(this.coup_possible(nombre_pions, colonne_depart, ligne_depart, colonne_arrivee, ligne_arrivee))
        {
            var longueur = this.tab[this.get_pos(colonne_depart, ligne_depart)].toString().length;
           //console.log("longueur "+longueur);
            var pions_a_deplacer = parseInt(this.tab[this.get_pos(colonne_depart, ligne_depart)].toString().substr(0,nombre_pions));
           // console.log("ahah: "+this.tab[this.get_pos(colonne_depart, ligne_depart)].toString().substr(0,nombre_pions));
            this.tab[this.get_pos(colonne_arrivee, ligne_arrivee)] =parseInt( this.tab[this.get_pos(colonne_depart, ligne_depart)].toString().substr(0,nombre_pions) + this.tab[this.get_pos(colonne_arrivee, ligne_arrivee)].toString()); // on ajoute sur la case finale
            if(this.tab[this.get_pos(colonne_depart, ligne_depart)].toString.length===1){
                this.tab[this.get_pos(colonne_depart, ligne_depart)]=0;
            }
            else {
                this.tab[this.get_pos(colonne_depart, ligne_depart)] = parseInt(this.tab[this.get_pos(colonne_depart, ligne_depart)].toString().substr(longueur - (nombre_pions - 1), longueur)); // on enlève sur la case de départ
            }


            if( (this.tab[this.get_pos(colonne_arrivee, ligne_arrivee)].toString().length) >= 5 ) // si la pile d'arrivée est plus grande que 5
            {


                    var dernier_pion = parseInt(this.tab[this.get_pos(colonne_arrivee, ligne_arrivee)].toString().charAt(0));

                if(dernier_pion == 1) // augmentation du score de J1 ou J2
                {
                    this.J1 ++;
                }
                if(dernier_pion == 2)
                {
                    this.J2 ++;
                }

                this.tab[this.get_pos(colonne_arrivee, ligne_arrivee)] = 0; // on enlève la pile du jeu
            }
        }
    }
};
