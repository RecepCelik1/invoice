projeyi ayağa kaldırmak için ; 

# öncelikle bir react-app oluşturun ; 

* npx create-react-app 

# daha sonra gerekli kütüphaneleri kurun ; 

* npm install @reduxjs/toolkit react-redux react-icons --save react-datepicker --save react-select jspdf --save jspdf jspdf-autotable -D tailwindcss

# daha sonra terminalde tailwindcss için konfigürasyonu yapın 

* npx tailwindcss init 

* gelen tailwind.config.js dosyasının içeriğini aşağıdakilerle değiştirin ; 

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

# src klasörünü benim projemdeki src klasorü ile değiştirin 

# son olarak terminalde aşağıdaki komutu çalıştırıp terminali kapatın 

* npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch

# yeni bir terminal açıp npm start komutunu girerek projeyi ayağa kaldırın
