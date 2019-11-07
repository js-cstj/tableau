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
		this.stats = await this.loadJson("stats.json");
		this.app.appendChild(this.dom_create());
	}
	static dom_create() {
		var resultat;
		resultat = document.createElement("table");
		resultat.classList.add("stats");
		resultat.appendChild(this.dom_colgroup());
		resultat.appendChild(this.dom_thead());
		resultat.setAttribute("border", "1");
		resultat.appendChild(this.dom_tbody());
		return resultat;
	}
	static dom_colgroup() {
		var resultat;
		resultat = document.createElement("colgroup");
		for (let k in this.stats.colonnes) {
			var colonne = this.stats.colonnes[k];
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
	static dom_thead() {
		var resultat;
		resultat = document.createElement("thead");
		var rangee = resultat.appendChild(document.createElement("tr"));
		for (let k in this.stats.colonnes) {
			var colonne = this.stats.colonnes[k];
			var cellule = rangee.appendChild(document.createElement("th"));
			cellule.setAttribute("title", colonne.titre);
			cellule.setAttribute("data-for", k);
			cellule.appendChild(document.createTextNode(colonne.label));
			cellule.appendChild(document.createElement("span"));
		}
		return resultat;
	}
	static dom_tbody() {
		var resultat;
		console.log(this.stats.colonnes);
		resultat = document.createElement("tbody");
		for (let k in this.stats.equipes) {
			var equipe = this.stats.equipes[k];
			var rangee = resultat.appendChild(document.createElement("tr"));
			for (let c in this.stats.colonnes) {
				rangee.appendChild(this.dom_cellule(this.stats.colonnes[c], equipe[c]));
			}
		}
		return resultat;
	}
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
		return new Promise(resolve => {
			window.addEventListener("load", () => {
				resolve();
			});
		});
	}
}
