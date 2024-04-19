<script lang="ts" setup>
type Props = {
  event: any;
  events: any;
};

const { event, events } = defineProps<Props>();
const { lang } = useLang();

const intro = [
  `In 2020 eˉlektron started an experimental project Anthropologies of Space, in which the participating artists deal with issues of man and space. Even in the global context, the contemporary cultural space is in a new delicate situation. As cultural theorists have documented, contemporary precarity is linked to a broader range of technological, social, and political changes. Traditional "grand narratives" and values ​​associated with the Enlightenment and the old Western moral order are also constantly being called into question. Our traditional space of values ​​has to constantly explain and make sense of itself, to stand up for itself.
Artists Daria Khrystych, Liis Vares, Bohdana Korohod and Inga Salurand focus on liminality. The concept of liminal spaces is familiar from architecture - spaces whose function is limited, whose role is to take the user from one place to another. These spaces are not for staying or being in - lobbies, corridors, streets, highways and abandoned spaces. Transitional spaces are also psychological spaces - spaces where we mentally prepare ourselves to consider what is on the other side. Big personal changes are also transition spaces - a child becomes an adult and leaves home, you are fired or you are caught in the emotional whirlwind of a divorce. In these spaces - both in a stairwell and in court - one is in limbo - neither here nor there. Transitional spaces can and must be treated as a material, semiotic and psychological whole.
The 2022 Anthropologies of Space had their premieres at the Baltoscandal festival in different locations in the city of Rakvere.`,
  `Aastal 2020 alustasime eˉlektronis eksperimentaalprojektiga Ruumiantropoloogiad, milles osalevad kunstnikud käsitlevad inimese ja ruumi küsimusi. Isegi globaalses kontekstis on kaasaegne kultuuriruum õrnas, hoovuste eest põiklevas olukorras. Nagu kultuuriteoreetikud on dokumenteerinud, on tänapäeva ebakindlus seotud laiema hulga tehnoloogiliste, sotsiaalsete ja poliitiliste muutustega. Ka traditsioonilised "suured narratiivid" ja väärtushinnangud, mis on seotud valgustusajastu ja vana lääne moraalikorraga pannakse pidevalt küsimuse alla. Meie traditsiooniline väärtusruum peab justkui pidevalt ennast selgitama ja mõtestama, enda eest seisma.
Kunstnikud Daria Khrystych, Liis Vares, Bohdana Korohod ja Inga Salurand keskenduvad seekord liminaalsusele. Ühest küljest on liminaalsete ruumide mõiste tuttav arhitektuurist - ruumid, mille funktsioon on limiteeritud, mille roll on kasutajat viia ühest kohast teise. Need ruumid pole viibimiseks ega tegutsemiseks - fuajeed, koridorid, tänavad, maanteed ja mahajäetud ruumid. Üleminekuruumid on ka psühholoogilised ruumid - ruumid, kus me valmistame end vaimselt arvestama sellega, mis on teistpool. Ka suured isiklikud muutused on üleminekuruumid - laps saab täiskasvanuks ja lahkub kodust, sind vallandatakse või sa oled sattunud lahutuse emotsionaalsesse tõmbetuulde. Neis ruumides - nii trepikojas kui ka kohtus on inimene ühtmoodi limbos - ei siin ega seal. Üleminekuruume saab ja peab käsitlema materiaalse, semiootilise ja psühholoogilise tervikuna.
2022 aasta Ruumiantropoloogiad esietendusid Baltoscandali festivalil Rakvere linna eri paikades.`,
];
</script>

<template>
  <article class="Page SingleProduction">
    <header class="eventHeader">
      <div class="eventTitles">
        <h2 class="ETitle lg">{{ event.titles[lang] }}</h2>
        <h4 v-if="event.authors">{{ event.authors }}</h4>
        <slot name="header" />
      </div>
      <EBox class="eventDetails">
        <EDetailsList
          v-if="event.detailss[lang]"
          :details="parseDetails(event.detailss[lang])"
        />
        <EContent :content="event.descriptions[lang]" />
      </EBox>
    </header>
    <ImageSlider v-if="event.images" :images="event.images" />
    <ContentBlocks
      v-if="event.cards && event.cards.length > 0"
      :key="lang"
      :cards="lang === 0 ? event.cards : event.localizations[0].cards"
    />
    <slot />
    <AnthroFooter :events="events">
      <ETitle el="h3" size="lg">
        {{ $t("anthropologies_of_space") }}
      </ETitle>
      <p>
        {{ intro[lang] }}
      </p>
    </AnthroFooter>
  </article>
  <BackgroundImage
    v-if="event.backgroundImage"
    :image="event.backgroundImage"
  />
</template>

<style scoped>
.eventHeader {
  display: flex;
  flex-direction: column;
  gap: var(--gap-4);
  color: var(--gray-300);
  padding: 0 var(--p-4);
}

.eventHeader .eventTitles {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-3);
  grid-area: title;
}
.eventHeader .eventTitles h2 {
  /* margin-bottom: var(--m-3); */
}

.eventHeader .eventDescription {
  grid-area: description;
}

.eventItems {
  display: flex;
  flex-direction: column;
  gap: var(--gap-4);
}

.eventItem {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.eventDetails {
  gap: var(--gap-4);
}

/* TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EContent.eventDescription :deep(p) {
    font-size: var(--text-xl);
  }
}
@media only screen and (min-width: 600px) {
  .eventHeader {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-areas: "title title title title" "content content content content";
  }

  .eventDetails {
    grid-area: content;
  }
  .eventItems {
    grid-area: items;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--gap-5);
  }
}
@media only screen and (min-width: 1240px) {
  .eventHeader {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .eventHeader {
    grid-template-areas: "title title title content content content content content";
  }
  .eventDetails {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-areas: "details details content content content";
  }

  .eventDetails > .EDetailsList {
    grid-area: details;
  }
  .eventDetails > .EContent {
    grid-area: content;
  }
}
</style>
