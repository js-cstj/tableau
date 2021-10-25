/*jslint esnext:true, browser:true*/
/**
 * @module App
 */
export default class App {
	/**
	 * Méthode principale. Sera typiquement appelée après le chargement de la page.
	 */
	static async main() {
		this.app = document.getElementById("app");
		this.loadJson("stats.json").then((stats) => {
			this.app.appendChild(this.dom_create(stats));
			return stats;
		});
	}

	/**
	 * Retourne un tableau avec les données contenues dans stats
	 * @param {object} stats L'ensemble des stats incluanr les colonnes et les equipes
	 * @returns {HTMLElement} Un élément table
	 */
	static dom_create(stats) {
		var resultat;
		resultat = document.createElement("table");
		resultat.classList.add("stats");
		resultat.appendChild(this.dom_colgroup(stats.colonnes));
		resultat.appendChild(this.dom_thead(stats.colonnes));
		resultat.setAttribute("border", "1");
		resultat.appendChild(this.dom_tbody(stats.colonnes, stats.equipes));
		return resultat;
	}
	/**
	 * Retourne un élément colgroup avec des col en fonction des données contenues dans colonnes
	 * @param {object} colonnes La description de chaque colonne à créer
	 * @returns {HTMLElement} Un élément colgroup
	 */
	static dom_colgroup(colonnes) {
		var resultat;
		resultat = document.createElement("colgroup");
		for (let k in colonnes) {
			var colonne = colonnes[k];
			var col = resultat.appendChild(document.createElement("col"));
			col.setAttribute("id", "col-" + k);
			if (colonne.styleCol) {
				for (let p in colonne.styleCol) {
					col.style[p] = colonne.styleCol[p];
				}
			}
		}
		return resultat;
	}
	/**
	 * Retourne l'entête d'un tableau avec les données contenues dans colonnes
	 	* @param {object} colonnes La description de chaque colonne à créer
		* @returns {HTMLElement} Un élément thead
	 */
	static dom_thead(colonnes) {
		var resultat;
		resultat = document.createElement("thead");
		var rangee = resultat.appendChild(document.createElement("tr"));
		for (let k in colonnes) {
			var colonne = colonnes[k];
			var cellule = rangee.appendChild(document.createElement("th"));
			cellule.setAttribute("title", colonne.titre);
			cellule.setAttribute("data-for", k);
			cellule.appendChild(document.createTextNode(colonne.label));
			cellule.appendChild(document.createElement("span"));
		}
		return resultat;
	}

	/**
	 * Retourne le corps du tableau avec les données contenues dans colonnes et equipes
	 * @returns {HTMLElement} Un élément tbody
	 */
	static dom_tbody(colonnes, equipes) {
		var resultat;
		resultat = document.createElement("tbody");
		for (let k in equipes) {
			var equipe = equipes[k];
			var rangee = resultat.appendChild(document.createElement("tr"));
			for (let c in colonnes) {
				rangee.appendChild(this.dom_cellule(colonnes[c], equipe[c]));
			}
		}
		return resultat;
	}
	/**
	 * Retourne une cellule du tableau.
	 * @param   {object}      colonne la description de la colonne
	 * @param   {mixed}       contenu Le texte à mettre dans la cellule
	 * @returns {HTMLElement} Un élément th ou td en fonction de la colonne
	 */
	static dom_cellule(colonne, contenu) {
		var resultat;
		if (colonne.th) {
			resultat = document.createElement("th");
			resultat.setAttribute("scope", "row");
		} else {
			resultat = document.createElement("td");
		}
		if (colonne.style) {
			for (let p in colonne.style) {
				resultat.style[p] = colonne.style[p];
			}
		}
		resultat.appendChild(document.createTextNode(contenu));
		return resultat;
	}

	/**
	 * Charge un fichier JSON et retourne la promesse correspondante
	 * @returns {HTMLElement} Un élément table
	 */
	static async loadJson(fic) {
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("get", fic);
			xhr.responseType = "json";
			xhr.addEventListener("load", e => {
				resolve(e.target.response);
			});
			xhr.send();
		});
	}
	/**
	 * Méthode qui permet d'attendre le chargement de la page avant d'éxécuter le script principal
	 * @returns {Promise} La promesse qui sera résolue après chargement
	 */
	static load() {
	}
	static init() {
		return new Promise(resolve => {
			window.addEventListener("load", () => {
				resolve();
			});
		});
	}
}
App.init().then(() => {
	App.main();
});