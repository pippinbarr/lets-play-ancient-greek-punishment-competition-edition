# Initial thoughts (Monday, 22 July 2019, 15:55PM)

In a development sense this game seems like it's one of the most simple of all the version (perhaps alongside five-in-one, but perhaps even more simple than that technically?). Really it amounts to a combination of the Inversion Edition with the standard edition, and allowing both sides to be controlled by a player. The game is then two player with the punished character (e.g. Sisyphus) trying to complete their task (push the boulder to the top of the hill) as per every punishment, but now plausibly completable (per inversion edition), and the punisher character (e.g. the boulder) trying to stop them from doing so (and in effect "breaking" the Myth, ala Prince of Persia: The Sands of Time - "that's not how it happened").

As such, I don't think there will be a huge amount of actual development work to be done. It will essentially be the indentical code to Inversion Edition, with the change that instead of a CPU controlling the punished character, I'll return it to being controlled by the other player.

I guess I need to think about where to position instructions. And I need to think about how to make it play nice on mobile. But that's about it in terms of complexities of development.

Meanwhile, I do think that _as a game_ it's a genuinely interesting way of experiencing the myth. In a way this could almost have been the first version altogether if I'd wanted to make it yet more game-y - it becomes that much more like track and field in a way, with two players vying to input the fastest so as to reach the end they desire.

The idea of furious competition in a "sports" style (or WarioWare or similar I suppose) in this context is quite pleasing. Presuming that the players are evenly matched then you have the dynamics of

- They fight each other and thus reach a stasis of furious effort that is nicely representative of the stasis of the various punishments - nothing ever changes despite labour (except for Prometheus I suppose, who doesn't labour per se)
- One or the other gives up and lets the thing happen to them, leading to unopposed "victory" in one case (for the punished) or just a kind of "being held down and made to say uncle" experience in the other (for the punisher)
- They both give up and walk away, leading to a kind of static eternity as well not totally different from the first case?

It also occurs to me that the fact that one player can win and the other can't is a nice asymmetry that you would hope/imagine would lead the punisher to keep punishing - they don't want to lose, they have a negative goal.

Having two players and notably having one player punish the other is a dynamic that I think lends a certain frisson to the experience and gets at experiences I've often wanted to explore of "having something done to you you cannot resist" (the shelf game for instance, or really the original Prometheus). Having it be another human sitting beside you has more zest to it than a CPU opponent.

I like the idea that potentially you could get some hand fighting or other meta elements to the game - the punished might break free by pushing aside the punished (the actual player) in order to get sufficient time at the keyboard to reach victory.

In short the various dynamics introduced by having another player that you're in direct conflict with I think intensifies the felt aspect of the punishment and maybe humanises the punisher yet further than the inversion edition where it was more of a joke about punishing a computer with no need or desire to stop etc...

I think there are things to think about. Cogito ergo... cogito or something?

---

# Back on that horse (eagle?) (Monday, 19 August 2019, 9:58AM)

So I made the Sisyphus one work (for desktop - must remember mobile) the other day and it was actually fairly satisfying. I wrote somewhere (I suppose the commit) about it being satisfying to make some decisions about the asymmetry of the experience. You read the word "competition" and immediately start thinking about fairness, but the interesting thing about the punishment games _is_ their asymmetry, so the competition edition shouldn't really be any different - it sucks to be the punishee, you'll tend to lose (but then have the "victory" of never losing, finally?). With that in mind all the versions become so much easier. Not to mention that I think every other version excluding Sisyphus is much more reactive anyway? The punished person churns away while the punisher has more discrete activities that sabotage? Well Prometheus is different again...?

Anyway, it's coming along and I'm hopeful the other versions are more straightforwardly about adding controls to Inversion that allow a human to play what was previously the CPU. That's all I wanted to say. I'm here. I see you.

I say "back on the horse" but looking at it I see I didn't even start on the project until the 22nd of July,, which is only... four weeks ago.  And in the interim I released Mobile Chogue with Jonathan (which included a bunch of fiddling) and made and released Chesses, and wrote essays about the Twine and Bitsy Editions and Chesses, so I haven't exactly been idle. And yet it feels like "a while" since I made a game? I suppose it's good I feel that way... the fire still burns etc.

---

# Mobile friendly? (Wednesday, 21 August 2019, 11:28AM)

A pause to think about the issue of whether this game can work well on mobile.

I really like the idea that it would. Primarily it's just that people use mobile devices a lot and if my game isn't working on mobile then that's a bunch of people who wouldn't be exposed to it (and yes, I know not many play these more fringe games and that's okay). More than that, though, there's a clear win to having two people hunched over a single phone/tablet fighting it out - there's something both dystopian (of course) but also oddly community-making about the activity that adds to the strangeness of it. You get that on a computer too, but maybe not as much?

The issue is in the levels with more complex controls (notably for the punisher). So we have

- Sisyphus: fine, I think. People can tap on opposing sides of the screen roughly associated with the correct figure.
- Danaids: fine, I think. The Danaid can tap on most of the screen, the bath tormentor can touch the bath to empty it.
- Zeno: fine now that it's exertion based, same as Sisyphus with a split screen.
- Tantalus: this gets hard because there are four distinct inputs in two styles - tapping and touch-and-hold. You can of course break the screen into quadrants, and that would work. Maybe that's okay? Literally "tap repeatedly here to reach" "touch and hold here to raise the branch"? It's basically just buttons at that point though - shoulder there just be literal buttons on the screen? Maybe that's not terrible?
- Prometheus: the problematic one. Prometheus himself is fine, it's the damn eagle. It can fly around and it can peck. The most obvious solution is to have the eagle fly in a line to where you tap and land if it hits the rock, then tapping prometheus would peck and tapping elsewhere would take off. It seems relatively okay, but interestingly wouldn't work with the buttons approach.

Swipes are another potential form of input, but they don't really work well I think because they tend to interact with the browser UI in undesirable ways (like scrolling or bringing up menus etc.)

So the "buttons" version is nice for Sisyphus, Danaids, Zeno, Tantalus, but not Prometheus. The instructions-and-zones version is solid for Prometheus, etc., but maybe not Tantalus which is overly complex.

Or do you do a mixed version and throw consistency to the wind?

Or do you simply not make it mobile friendly?

Another option on mobile for Prometheus would be to have buttons that you tap or hold to "fly to Prometheus" and then "peck" which enabled and disable as they become contextually relevant? Maybe that's a doable compromise? I do quite enjoy the though of the stupid buttons? Or are they stupid?

HMMMMM.
