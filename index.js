//imports
const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')
const mongoose   = require('mongoose')
const Niche      = require('./models/nicheSchema')
const Settings   = require('./models/settingsSchema')
const path       = require('path')

//defines
const app = express()

//db_config
const DB_USER = "doadmin"
const DB_PASS = "20Vu381GL5dJ7U9P"
const DB_NAME = "winEz"
const CERTIF  = "certif.crt"
const db = mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@db-mongodb-sgp1-90524-0f61c02b.mongo.ondigitalocean.com/${DB_NAME}?authSource=admin&replicaSet=db-mongodb-sgp1-90524&tls=true&tlsCAFile=${CERTIF}`,{useNewUrlParser: true})
    .then(console.log('DB CONNECTED'))

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './out')))

//routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '.out/index.html'));
});

app.get('/en', (req,res) => {
    res.sendFile(path.join(__dirname, './out/en.html'));
});

app.get('/get-settings', async(req, res) => {
    const n = await Settings.findOne()
    if(!n) return res.json({'empty': true})
    return res.json(n)
})

app.post('/save-settings', async(req, res) => {
    const settings = {
        arLocker: req.body.arLocker,
        enLocker: req.body.enLocker,
        trLocker: req.body.trLocker,
        idLocker: req.body.idLocker,
        frLocker: req.body.frLocker,
        deLocker: req.body.deLocker,
        esLocker: req.body.esLocker,
        brLocker: req.body.brLocker,
    }
    const n = await Settings.findOne()
    if(!n) return new Settings(settings).save().then(result => {
        if(result) return res.json({'saved': true})
    })
    await n.updateOne(settings).then(result => {
        if(result.modifiedCount > 0) return res.json({'saved': true})
    })
})

app.post('/add-niche', async(req, res) => {
    const niche = {
        type           : req.body.type,
        langs          : req.body.langs,
        names          : req.body.names,
        icon           : req.body.icon,
        bg             : req.body.bg,
        isPlatforms    : req.body.isPlatforms,
        platforms      : req.body.platforms,
        isItem         : req.body.isItem,
        itemNames      : req.body.itemNames,
        itemIcon       : req.body.itemIcon,
        isAmounts      : req.body.isAmounts,
        amounts        : req.body.amounts,
        isCustomLocker : req.body.isCustomLocker,
        customLocker   : req.body.customLocker,
        keywords       : req.body.keywords,
        path           : req.body.path,
        isSelect       : req.body.isSelect,
        selectType     : req.body.selectType,
        isVideo        : req.body.isVideo,
        video          : req.body.video,
        isReceiver     : req.body.isReceiver,
        isUsername     : req.body.isUsername,
    }
    //check if path is unique
    const n = await Niche.find({path: niche.path})
    if(n.length !== 0) return res.json({'found': true})
    new Niche(niche).save().then(result => {
        console.log(result)
        if(result) return res.json({'created': true})
        return res.json({'created': false})
    })
})

app.get('/get-en-niches', async(req, res)=>{
    const niches = await Niche.find({langs: "en"})
    if(niches.length === 0) return res.json({'found': false})
    res.json(niches)
})

app.post('/get-en-niche', async(req, res) => {
    const niches = await Niche.find({path:req.body.path, langs: "en"})
    //if(niches.length === 0) return res.json({'found': false})
    res.json(niches)
})

app.post('/get-ar-niche', async(req, res) => {
    const niches = await Niche.find({path:req.body.path, langs: "ar"})
    //if(niches.length === 0) return res.json({'found': false})
    res.json(niches)
})

app.post('/get-tr-niche', async(req, res) => {
    const niches = await Niche.find({path:req.body.path, langs: "tr"})
    //if(niches.length === 0) return res.json({'found': false})
    res.json(niches)
})

app.post('/get-id-niche', async(req, res) => {
    const niches = await Niche.find({path:req.body.path, langs: "id"})
    //if(niches.length === 0) return res.json({'found': false})
    res.json(niches)
})

app.post('/get-fr-niche', async(req, res) => {
    const niches = await Niche.find({path:req.body.path, langs: "fr"})
    //if(niches.length === 0) return res.json({'found': false})
    res.json(niches)
})

app.post('/get-de-niche', async(req, res) => {
    const niches = await Niche.find({path:req.body.path, langs: "de"})
    //if(niches.length === 0) return res.json({'found': false})
    res.json(niches)
})

app.post('/get-es-niche', async(req, res) => {
    const niches = await Niche.find({path:req.body.path, langs: "es"})
    //if(niches.length === 0) return res.json({'found': false})
    res.json(niches)
})

app.post('/get-br-niche', async(req, res) => {
    const niches = await Niche.find({path:req.body.path, langs: "br"})
    //if(niches.length === 0) return res.json({'found': false})
    res.json(niches)
})

//listen
const PORT = process.env.PORT || 3001
app.listen(PORT, console.log(`server running on ==> http://localhost:${PORT}`))