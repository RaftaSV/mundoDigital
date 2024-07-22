import express from 'express';
const app = express()
app.use(express.json())

const birds = [
    {
        id: 1,
name: "Common Greenshank",
description:"The common greenshank (Tringa nebularia) is a wader in the large family Scolopacidae, the typical waders. \
The genus name Tringa is the New Latin name given to the green sandpiper by Aldrovandus in 1599 based on Ancient Greek trungas, a thrush-sized, white-rumped, tail-bobbing wading bird mentioned by Aristotle. \
The specific nebularia is from Latin nebula \"mist\". Like the Norwegian Skoddefoll, this refers to the greenshank's damp marshy habitat.",
imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Greenshank_%28Tringa_nebularia%29.jpg/1920px-Greenshank_%28Tringa_nebularia%29.jpg",
wikipediaUrl: "https://en.wikipedia.org/wiki/Common_greenshank"

    },
    {
        id: 2,
        name: "Bean Goose",
        description: "The bean goose (Anser fabalis or Anser serrirostris) is a goose that breeds in northern Europe and Eurosiberia. It has two distinct varieties, one inhabiting taiga habitats and one inhabiting tundra. These are recognised as separate species by the American Ornithologists' Union and the IOC (taiga bean goose and tundra bean goose), but are considered a single species by other authorities, such as the British Ornithologists' Union. It is migratory and winters further south in Europe and Asia.",
        imageUrl: "https://media.istockphoto.com/id/509959359/photo/bean-goose.jpg?s=612x612&w=0&k=20&c=xoKjfokGa_uGtbSIvNjyZ3SN8hOaJ2mqkslpxOFqbLo=",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Bean_goose"
    },
    {
        id: 3,
        name: "Barn Owl",
        description: "The barn owl (Tyto alba) is the most widely distributed species of owl in the world and one of the most widespread of all species of birds, being found almost everywhere except for the polar and desert regions, Asia north of the Himalayas, most of Indonesia, and some Pacific Islands. It is also known as the common barn owl, to distinguish it from the other species in its family, Tytonidae, which forms one of the two main lineages of living owls, the other being the typical owls (Strigidae).",
        imageUrl: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/297342281/1800",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Barn_owl"
    }, 
    {
        id: 4,
        name: "Aquatic warbler",
        description: "The aquatic warbler (Acrocephalus paludicola) is an Old World warbler in the genus Acrocephalus. It breeds in temperate eastern Europe and western Asia, with an estimated population of 11,000-15,000 pairs.[2] It is migratory, wintering in west Africa. After many years of uncertainty, the wintering grounds of much of the European population were finally discovered in Djoudj National Bird Sanctuary, Senegal, with between 5,000 and 10,000 birds present at this single site.[3] Its south-westerly migration route means that it is regular on passage as far west as Great Britain and Ireland.",
        imageUrl: "https://www.birdguides-cdn.com/cdn/articles/39162798_466110903887613_194953762475868160_n.jpg",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Aquatic_warbler"
    },
    {
        id: 5,
        name: "Chinstrap penguin",
        description: "The chinstrap penguin (Pygoscelis antarcticus) is a species of penguin that inhabits a variety of islands and shores in the Southern Pacific and the Antarctic Oceans. Its name stems from the narrow black band under its head, which makes it appear as if it were wearing a black helmet, making it easy to identify.[2] Other common names include ringed penguin, bearded penguin, and stonecracker penguin, due to its loud, harsh call.",
        imageUrl: "https://static.nationalgeographic.co.uk/files/styles/image_3200/public/1014841.jpg?w=1900&h=1267",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Chinstrap_penguin"
    },
    {
        id: 6,
        name: "Red-billed quele",
        description: "The red-billed quelea (/ˈkwiːliə/;[3] Quelea quelea), also known as the red-billed weaver or red-billed dioch, is a small—approximately 12 cm (4.7 in) long and weighing 15–26 g (0.53–0.92 oz)—migratory, sparrow-like bird of the weaver family, Ploceidae, native to Sub-Saharan Africa.",
        imageUrl: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/396060181/640",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Red-billed_quelea"
    },
    {
        id: 7,
        name: "Golden phesant",
        description: "The real golden pheasants are native to the Western forests of China. Named after their golden crests, we are wowed by the male’s colorful body! They can grow up to 41 inches long and the tail is 2/3 the length of the entire body. Golden pheasants are really hard to find and there is little known about them as they are seldom seen in their natural habitat. ",
        imageUrl: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/150563021/1800",
        wikipediaUrl: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRs_5DX-V85uECceZcmN55Hn9kPbWo40XD2__PVhJ-vYJIIbTQfQsLxIcwuNdibFCoJJTMfD0srHa1CElk"
    },
    {
        id: 8,
        name: "CEBU FLOWERPECKER",
        description: "Found only in the Cebu Islands in the Philippines, these birds were thought to be extinct due to the disappearance of their habitat. But in 1992 they popped up again in a small limestone forest in the Central Cebu Protected Landscape. ",
        imageUrl: "https://cdn.shopify.com/s/files/1/1317/9597/files/Cebu_flowerpecker_Dicaeum_quadricolor_480x480.jpg?v=1623745246",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Cebu_flowerpecker"
    },
    {
        id: 9,
        name: "RUFOUS-HEADED HORNBILL",
        description: "Native to the Philippines, the Rufous-headed Hornbill is one of the most endangered of its species. They sport a bony ‘casque’ which sticks out from the top of their wrinkly red-orangey bills. The bill may seem strong but it is actually structurally thin with hollow bone cells.",
        imageUrl: "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/309342461/",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Walden%27s_hornbill"
    }


   
]



app.get('/', (req,res) => {
    res.send(birds)
})


export default (req, res) => {
  // Use express middleware for handling requests
  return new Promise((resolve, reject) => {
      app(req, res, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve();
          }
      });
  });
};