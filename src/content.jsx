import data from "./etudiants.js";
import { useState, useEffect } from "react";

export default function Content() {
  const [groupe, setGroupe] = useState("");
  const [etudiants, setEtudiants] = useState([]);
  const [oetudiant, setOetudiant] = useState({
    id: "",
    nom: "",
    note: ""
  }); 
  const [modeModifier, setModeModifier] = useState(false);

  useEffect(function() {
    setEtudiants(groupe ? data[groupe] : []);
  }, [groupe]);

  function ajouter() {
    if (oetudiant.id == "" || oetudiant.nom == "" || oetudiant.note == "") {
      alert("Remplissez tous les champs");
      return;
    }

    const existe = etudiants.some(function(item) {
      return item.id == oetudiant.id;
    });

    if (existe) {
      alert("L'id existe déjà");
      return;
    }

    const nouvelEtudiant = {
      id: Number(oetudiant.id),
      nom: oetudiant.nom,
      note: Number(oetudiant.note)
    };

    setEtudiants([...etudiants, nouvelEtudiant]);
    setOetudiant({ id: "", nom: "", note: "" });
  }

  function modifier() {
    const nouvelleListe = etudiants.map(function(item) {
      if (item.id == oetudiant.id) {
        return {
          id: Number(oetudiant.id),
          nom: oetudiant.nom,
          note: Number(oetudiant.note)
        };
      }
      return item;
    });

    setEtudiants(nouvelleListe);
    setOetudiant({ id: "", nom: "", note: "" });
    setModeModifier(false);
  }

  function supprimer(id) {
    const nouvelleListe = etudiants.filter(function(item) {
      return item.id != id;
    });

    setEtudiants(nouvelleListe);
  }

  function afficherdetails(item) {
    setOetudiant({
      id: item.id,
      nom: item.nom,
      note: item.note
    });

    setModeModifier(true);
  }

  let nombreAdmis = 0;
  let nombreRedoublants = 0;

  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].note >= 10) {
      nombreAdmis++;
    } else {
      nombreRedoublants++;
    }
  }

  return (
    <main className="min-h-screen flex-1 bg-slate-50 p-8">

      <h2 className="mb-5 text-3xl font-bold text-slate-800">
        Liste des étudiants
      </h2>

      <select
        value={groupe}
        onChange={function(e) {
          setGroupe(e.target.value);
          setOetudiant({ id: "", nom: "", note: "" });
          setModeModifier(false);
        }}
        className="mb-6 rounded-lg border-2 border-blue-600 bg-white p-2 text-black"
      >
        <option value="">Choisir un groupe</option>
        {Object.keys(data).map(function(g) {
          return (
            <option key={g} value={g}>
              {g}
            </option>
          );
        })}
      </select>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-green-100 p-5">
          <h3 className="text-xl font-bold text-green-700">Admis</h3>
          <p className="text-3xl font-bold text-green-700">{nombreAdmis}</p>
        </div>

        <div className="rounded-xl bg-red-100 p-5">
          <h3 className="text-xl font-bold text-red-700">Redoublants</h3>
          <p className="text-3xl font-bold text-red-700">{nombreRedoublants}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-bold text-slate-800">
          {modeModifier ? "Modifier un étudiant" : "Ajouter un étudiant"}
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="number"
            placeholder="ID"
            value={oetudiant.id}
            disabled={modeModifier}
            onChange={function(e) {
              setOetudiant({ ...oetudiant, id: e.target.value });
            }}
            className="rounded-lg border border-slate-300 px-4 py-2"
          />

          <input
            type="text"
            placeholder="Nom"
            value={oetudiant.nom}
            onChange={function(e) {
              setOetudiant({ ...oetudiant, nom: e.target.value });
            }}
            className="rounded-lg border border-slate-300 px-4 py-2"
          />

          <input
            type="number"
            placeholder="Note"
            min="0"
            max="20"
            value={oetudiant.note}
            onChange={function(e) {
              setOetudiant({ ...oetudiant, note: e.target.value });
            }}
            className="rounded-lg border border-slate-300 px-4 py-2"
          />

          <button
            onClick={modeModifier ? modifier : ajouter}
            disabled={!groupe}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {modeModifier ? "Enregistrer" : "Ajouter"}
          </button>

          {modeModifier && (
            <button
              onClick={function() {
                setOetudiant({ id: "", nom: "", note: "" });
                setModeModifier(false);
              }}
              className="rounded-lg bg-slate-500 px-5 py-2 text-white hover:bg-slate-600"
            >
              Annuler
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {etudiants.map(function(item) {
          return (
            <div
              key={item.id}
              className={`rounded-xl p-5 shadow ${
                item.note >= 10 ? "bg-white" : "bg-red-100"
              }`}
            >
              <h3 className="text-lg font-bold text-slate-800">
                {item.nom}
              </h3>

              <p className="mt-2 text-slate-500">ID : {item.id}</p>
              <p className="mt-2 text-slate-500">Note : {item.note} / 20</p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={function() {
                    afficherdetails(item);
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Modifier
                </button>

                <button
                  onClick={function() {
                    supprimer(item.id);
                  }}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}

