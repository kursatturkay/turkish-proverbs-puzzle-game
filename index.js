let kelimeler = []
let girilenHarfler = []
let karavanaHarfler = [""]

fetch('atasozleri.txt')
    .then(cevap => cevap.text())
    .then(text => {
        //console.log(text)
        kelimeler = text.split('\n')

        kelimeler.forEach((v, i) => {
            kelimeler[i] = kelimeler[i].replace('.', '')
            kelimeler[i] = kelimeler[i].replace(',', '')
            kelimeler[i] = kelimeler[i].replace(';', '')
            kelimeler[i] = kelimeler[i].replace('?', '')
            kelimeler[i] = kelimeler[i].replace('!', '')
            kelimeler[i] = kelimeler[i].replace('"', '')
            , kelimeler[i] = kelimeler[i].replace('\'', '')
        })

        devamet()
    })

devamet = () => {

    console.log(kelimeler)

    const dipnot=document.getElementById('dipnot').innerHTML =`${kelimeler.length} proverbs loaded from  database..`


    const havuz_uz = kelimeler.length;

    let rs = Math.random() * havuz_uz
    rs = Math.trunc(rs)

    const secilen = kelimeler[rs]
    const secilen_uz = secilen.length

    let yeniyazi = ""

    const tahta = document.getElementById("tahta")

    console.log(`seçilen: ${secilen}`)

    const tahtayi_temizle = () => {

        tahta.innerHTML = ""

        for (let i = 0; i < secilen.length; i++) {

            let x = secilen.substring(i, i + 1);//sıradaki harf boşlukmu degilmi öğrenmek için


            const karakter = (x == " ") ? " " : "_";

            tahta.innerHTML = tahta.innerHTML + karakter
            yeniyazi += karakter

        }
    }

    tahtayi_temizle()

    const giris = document.getElementById("giris")

    giris.addEventListener("keypress", (a) => {

        if (a.code == "Enter") {
            let harf = giris.value.toUpperCase()
            //alert(harf)
            girilenHarfler.push(harf)
            console.log(`girilen harfler: ${girilenHarfler}`)
            //tahta.innerHTML = ""

            yeniyazi = ""
            tahtayi_temizle()

            karavanaHarfler = []

            girilenHarfler.forEach(

                (e) => {

                    let bulundu = false

                    for (let i = 0; i < secilen_uz; i++) {
                        let x = secilen.substring(i, i + 1)

                        if (x.toLocaleUpperCase() == e) {
                            yeniyazi = yeniyazi.substring(0, i) + x + yeniyazi.substring(i + 1);
                            bulundu = true
                        }
                    }

                    if (!bulundu) {

                        karavanaHarfler.push(e)
                        let karavanaYazi = ""

                        karavanaHarfler.forEach((v) => {

                            karavanaYazi = karavanaYazi + v + " "

                            const yk = document.getElementById('yanliskutusu')

                            yk.innerHTML = karavanaYazi
                        })
                    }
                }
            )


        }

        console.log(`karavana harfler: ${karavanaHarfler}`)
        console.log(`yeniyazi: ${yeniyazi}`)
        tahta.innerText = yeniyazi

    })

}
    //alert(yk)

    window.fullScreen = true;

    function preventNumbers(event) {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode >= 48 && charCode <= 57) {
          event.preventDefault();
          return false;
        }
        return true;
      }

