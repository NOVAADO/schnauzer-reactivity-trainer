'use client';

import Link from 'next/link';
import { PROTOCOLS } from '@/lib/seed/protocols';
import { useTodayIncidents } from '@/lib/hooks';
import { Context } from '@/lib/types';

const CONTEXT_ICONS: Record<string, string> = {
  [Context.COUR]: '🌱',
  [Context.MAISON]: '🏠',
  [Context.RUE_CALME]: '🚴',
  [Context.RUE_STIMULANTE]: '🏙',
};

export default function ReactivityPage() {
  const todayIncidents = useTodayIncidents();

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-1">Réactivité</h1>
      <p className="text-sm text-gray-500 mb-6">Protocoles de désensibilisation et journal d{"'"}incidents</p>

      {/* Quick incident button */}
      <Link href="/reactivity/incident">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 active:bg-red-100 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📝</span>
            <div>
              <div className="font-semibold text-red-800">Noter un incident</div>
              <div className="text-sm text-red-600">Rapide — 10 secondes</div>
            </div>
          </div>
        </div>
      </Link>

      {todayIncidents.length > 0 && (
        <div className="bg-orange-50 rounded-2xl p-3 mb-4 text-center">
          <span className="text-sm text-orange-700">
            <strong>{todayIncidents.length}</strong> incident{todayIncidents.length > 1 ? 's' : ''} aujourd{"'"}hui
          </span>
        </div>
      )}

      {/* Protocols */}
      <h2 className="font-semibold text-gray-700 mb-3">Protocoles</h2>
      <div className="flex flex-col gap-3 mb-6">
        {PROTOCOLS.map((protocol) => (
          <Link key={protocol.id} href={`/reactivity/${protocol.id}`}>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 active:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{CONTEXT_ICONS[protocol.context] || '🐾'}</span>
                <div>
                  <div className="font-semibold">{protocol.name}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{protocol.description.slice(0, 70)}...</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* GUIDE COMPLET : Seuil d'apprentissage */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-indigo-800 mb-2">Comprendre le seuil d{"'"}apprentissage</h2>
        <p className="text-sm text-indigo-700 mb-3">
          Ton chien ne peut apprendre QUE quand il est sous son seuil de réaction.
          Au-dessus, son cerveau est en mode survie — il ne peut pas réfléchir.
        </p>
        <div className="space-y-2 text-sm text-indigo-700">
          <div className="flex gap-2 items-start">
            <span className="font-bold text-green-600">1-2</span>
            <span>ZONE D{"'"}APPRENTISSAGE — Le chien peut te regarder, prendre des gâteries, obéir. C{"'"}est ici que tu travailles.</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-bold text-yellow-600">3</span>
            <span>ZONE LIMITE — Le chien remarque le stimulus mais peut encore se concentrer. Récompense beaucoup ici.</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-bold text-red-600">4-5</span>
            <span>AU-DESSUS DU SEUIL — Aboiements, tire, ne prend plus de gâteries. STOP. Éloigne-toi. Rien à apprendre ici.</span>
          </div>
        </div>
      </div>

      {/* GUIDE : Alternatives au NON */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-purple-800 mb-2">Alternatives au &quot;NON&quot;</h2>
        <p className="text-sm text-purple-700 mb-3">
          Dire NON ne fonctionne pas avec les chiens réactifs. Ça ajoute du stress.
          À la place, propose un comportement de remplacement :
        </p>
        <div className="space-y-2 text-sm">
          <div className="bg-white rounded-xl p-3 flex justify-between">
            <span className="text-red-600 line-through">Il saute</span>
            <span className="text-green-700 font-medium">Demande &quot;assis&quot;</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex justify-between">
            <span className="text-red-600 line-through">Il aboie</span>
            <span className="text-green-700 font-medium">Dis &quot;place&quot; (va au tapis)</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex justify-between">
            <span className="text-red-600 line-through">Il tire en laisse</span>
            <span className="text-green-700 font-medium">Arrête-toi, attends qu{"'"}il revienne</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex justify-between">
            <span className="text-red-600 line-through">Il fixe un chien</span>
            <span className="text-green-700 font-medium">Dis son nom, récompense le regard</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex justify-between">
            <span className="text-red-600 line-through">Il grogne sur un visiteur</span>
            <span className="text-green-700 font-medium">Emmène-le dans une autre pièce + kong</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex justify-between">
            <span className="text-red-600 line-through">Il aboie sur la télé</span>
            <span className="text-green-700 font-medium">Mets en pause + redirige &quot;place&quot;</span>
          </div>
        </div>
      </div>

      {/* GUIDE : Signaux de stress */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-amber-800 mb-2">Reconnaître les signaux de stress</h2>
        <p className="text-sm text-amber-700 mb-2">
          Ton chien te dit qu{"'"}il est mal AVANT d{"'"}exploser. Apprends à lire ces signaux :
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white rounded-xl p-2">
            <div className="font-semibold text-amber-800">Stress léger</div>
            <ul className="text-amber-700 text-xs space-y-0.5 mt-1">
              <li>Se lèche les babines</li>
              <li>Baille (hors fatigue)</li>
              <li>Détourne la tête</li>
              <li>Oreilles en arrière</li>
              <li>Queue basse</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-2">
            <div className="font-semibold text-red-800">Stress élevé</div>
            <ul className="text-red-700 text-xs space-y-0.5 mt-1">
              <li>Corps rigide / figé</li>
              <li>Halète fort</li>
              <li>Pupilles dilatées</li>
              <li>Refuse les gâteries</li>
              <li>Poils du dos hérissés</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-amber-600 mt-2">
          Dès que tu vois un signal de stress léger : éloigne-toi du stimulus. N{"'"}attends pas l{"'"}explosion.
        </p>
      </div>

      {/* GUIDE : Cas des 2 chiens ensemble */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-teal-800 mb-2">Gérer 2 chiens réactifs (même portée)</h2>
        <p className="text-sm text-teal-700 mb-2">
          Quand un chien déclenche, l{"'"}autre amplifie. C{"'"}est la dynamique Thor + partenaire.
        </p>
        <ol className="list-decimal list-inside text-sm text-teal-700 space-y-1.5">
          <li><strong>Travaille TOUJOURS d{"'"}abord avec Thor seul</strong> (le déclencheur)</li>
          <li><strong>Quand Thor est stable</strong> à un exercice, introduis l{"'"}autre chien</li>
          <li><strong>En duo</strong>, commence dans un environnement facile (maison)</li>
          <li><strong>Si un des deux déclenche</strong>, sépare-les et reviens en solo</li>
          <li><strong>Évite</strong> de les promener ensemble tant que chacun ne marche pas calmement seul</li>
        </ol>
      </div>

      {/* GUIDE : Télévision et écrans */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-rose-800 mb-2">📺 Réagir à la télévision</h2>
        <p className="text-sm text-rose-700 mb-3">
          Les schnauzers ont un fort instinct de garde. Les animaux à l{"'"}écran déclenchent
          le même réflexe que les animaux réels. Voici comment gérer :
        </p>
        <div className="space-y-2 text-sm text-rose-700">
          <div className="bg-white rounded-xl p-3">
            <div className="font-semibold text-rose-800 mb-1">Pourquoi ils réagissent ?</div>
            <p>Les chiens voient les écrans modernes (60 Hz+). Les sons d{"'"}animaux déclenchent l{"'"}instinct territorial.
            En duo, Thor déclenche et l{"'"}autre amplifie — c{"'"}est la tempête parfaite.</p>
          </div>
          <div className="bg-white rounded-xl p-3">
            <div className="font-semibold text-rose-800 mb-1">Gestes immédiats</div>
            <ul className="space-y-1 text-xs">
              <li>🔇 <strong>Mute/Pause</strong> immédiatement (ne crie pas &quot;NON&quot;)</li>
              <li>🫱 Dis calmement &quot;[nom], place&quot; et pointe le tapis</li>
              <li>🦴 Donne un Kong fourré congelé AVANT de mettre la télé</li>
              <li>📏 Éloigne le tapis à 3+ mètres de l{"'"}écran</li>
              <li>🔊 Baisse le volume pendant les scènes avec animaux</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-3">
            <div className="font-semibold text-rose-800 mb-1">Routine soirée télé</div>
            <ol className="space-y-1 text-xs list-decimal list-inside">
              <li>30 min avant : session reniflage (fatiguer le cerveau)</li>
              <li>15 min avant : Kong congelé sur le tapis</li>
              <li>Allumer la télé, volume modéré</li>
              <li>Récompenser le calme pendant les scènes intenses</li>
              <li>Si explosion : pause, séparer les chiens, reprendre en 10 min</li>
            </ol>
          </div>
        </div>
        <p className="text-xs text-rose-600 mt-2">
          Consulte les protocoles &quot;Télévision — Désensibilisation&quot; et &quot;Soirée télé&quot; pour le programme complet.
        </p>
      </div>

      {/* Principes clés */}
      <div className="bg-blue-50 rounded-2xl p-4">
        <p className="font-semibold text-blue-800 text-sm mb-2">Principes clés</p>
        <ul className="text-sm text-blue-700 space-y-1.5">
          <li>Travailler SOUS le seuil de réaction</li>
          <li>Récompenser AVANT que le chien réagisse</li>
          <li>S{"'"}éloigner du stimulus si réaction</li>
          <li>Sessions courtes et positives (3-5 min max)</li>
          <li>Jamais dire NON — proposer une alternative</li>
          <li>Progresser : maison &gt; cour &gt; rue calme &gt; rue animée</li>
          <li>Si le chien échoue 2 fois, reculer d{"'"}un niveau</li>
        </ul>
      </div>
    </div>
  );
}
