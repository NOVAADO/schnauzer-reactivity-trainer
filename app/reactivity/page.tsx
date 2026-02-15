'use client';

import Link from 'next/link';
import { PROTOCOLS } from '@/lib/seed/protocols';
import { useTodayIncidents } from '@/lib/hooks';
import { Context } from '@/lib/types';

const CONTEXT_ICONS: Record<string, string> = {
  [Context.COUR]: '&#127793;',
  [Context.MAISON]: '&#127968;',
  [Context.RUE_CALME]: '&#128692;',
  [Context.RUE_STIMULANTE]: '&#127961;',
};

export default function ReactivityPage() {
  const todayIncidents = useTodayIncidents();

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold mb-1">Reactivite</h1>
      <p className="text-sm text-gray-500 mb-6">Protocoles de desensibilisation et journal d{"'"}incidents</p>

      {/* Quick incident button */}
      <Link href="/reactivity/incident">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 active:bg-red-100 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-3xl">&#128221;</span>
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
                <span className="text-2xl" dangerouslySetInnerHTML={{ __html: CONTEXT_ICONS[protocol.context] || '&#128062;' }} />
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
          Ton chien ne peut apprendre QUE quand il est sous son seuil de reaction.
          Au-dessus, son cerveau est en mode survie — il ne peut pas reflechir.
        </p>
        <div className="space-y-2 text-sm text-indigo-700">
          <div className="flex gap-2 items-start">
            <span className="font-bold text-green-600">1-2</span>
            <span>ZONE D{"'"}APPRENTISSAGE — Le chien peut te regarder, prendre des gateries, obeir. C{"'"}est ici que tu travailles.</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-bold text-yellow-600">3</span>
            <span>ZONE LIMITE — Le chien remarque le stimulus mais peut encore se concentrer. Recompense beaucoup ici.</span>
          </div>
          <div className="flex gap-2 items-start">
            <span className="font-bold text-red-600">4-5</span>
            <span>AU-DESSUS DU SEUIL — Aboiements, tire, ne prend plus de gateries. STOP. Eloigne-toi. Rien a apprendre ici.</span>
          </div>
        </div>
      </div>

      {/* GUIDE : Alternatives au NON */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-purple-800 mb-2">Alternatives au &quot;NON&quot;</h2>
        <p className="text-sm text-purple-700 mb-3">
          Dire NON ne fonctionne pas avec les chiens reactifs. Ca ajoute du stress.
          A la place, propose un comportement de remplacement :
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
            <span className="text-green-700 font-medium">Arrete-toi, attends qu{"'"}il revienne</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex justify-between">
            <span className="text-red-600 line-through">Il fixe un chien</span>
            <span className="text-green-700 font-medium">Dis son nom, recompense le regard</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex justify-between">
            <span className="text-red-600 line-through">Il grogne sur un visiteur</span>
            <span className="text-green-700 font-medium">Emmene-le dans une autre piece + kong</span>
          </div>
        </div>
      </div>

      {/* GUIDE : Signaux de stress */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-amber-800 mb-2">Reconnaitre les signaux de stress</h2>
        <p className="text-sm text-amber-700 mb-2">
          Ton chien te dit qu{"'"}il est mal AVANT d{"'"}exploser. Apprends a lire ces signaux :
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-white rounded-xl p-2">
            <div className="font-semibold text-amber-800">Stress leger</div>
            <ul className="text-amber-700 text-xs space-y-0.5 mt-1">
              <li>Se leche les babines</li>
              <li>Baille (hors fatigue)</li>
              <li>Detourne la tete</li>
              <li>Oreilles en arriere</li>
              <li>Queue basse</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-2">
            <div className="font-semibold text-red-800">Stress eleve</div>
            <ul className="text-red-700 text-xs space-y-0.5 mt-1">
              <li>Corps rigide / fige</li>
              <li>Halete fort</li>
              <li>Pupilles dilatees</li>
              <li>Refuse les gateries</li>
              <li>Poils du dos herisses</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-amber-600 mt-2">
          Des que tu vois un signal de stress leger : eloigne-toi du stimulus. N{"'"}attends pas l{"'"}explosion.
        </p>
      </div>

      {/* GUIDE : Cas des 2 chiens ensemble */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-4">
        <h2 className="font-bold text-teal-800 mb-2">Gerer 2 chiens reactifs (meme portee)</h2>
        <p className="text-sm text-teal-700 mb-2">
          Quand un chien declenche, l{"'"}autre amplifie. C{"'"}est la dynamique Thor + partenaire.
        </p>
        <ol className="list-decimal list-inside text-sm text-teal-700 space-y-1.5">
          <li><strong>Travaille TOUJOURS d{"'"}abord avec Thor seul</strong> (le declencheur)</li>
          <li><strong>Quand Thor est stable</strong> a un exercice, introduis l{"'"}autre chien</li>
          <li><strong>En duo</strong>, commence dans un environnement facile (maison)</li>
          <li><strong>Si un des deux declenche</strong>, separe-les et reviens en solo</li>
          <li><strong>Evite</strong> de les promener ensemble tant que chacun ne marche pas calmement seul</li>
        </ol>
      </div>

      {/* Principes cles */}
      <div className="bg-blue-50 rounded-2xl p-4">
        <p className="font-semibold text-blue-800 text-sm mb-2">Principes cles</p>
        <ul className="text-sm text-blue-700 space-y-1.5">
          <li>Travailler SOUS le seuil de reaction</li>
          <li>Recompenser AVANT que le chien reagisse</li>
          <li>S{"'"}eloigner du stimulus si reaction</li>
          <li>Sessions courtes et positives (3-5 min max)</li>
          <li>Jamais dire NON — proposer une alternative</li>
          <li>Progresser : maison &gt; cour &gt; rue calme &gt; rue animee</li>
          <li>Si le chien echoue 2 fois, reculer d{"'"}un niveau</li>
        </ul>
      </div>
    </div>
  );
}
