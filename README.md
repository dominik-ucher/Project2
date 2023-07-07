 IL Trond sin hjemmeside

# Planen til nettsiden 
1. Frontend Development
    a. Lage nettside med frontend
        <!-- I. Lage en hovedside -->
        <!-- II. Lage en vanlig side vanlig side med Skrive-boks -->
        <!-- III. Lage en kontakt side -->
        <!-- IV. Lage en Register og Login side -->
    <!-- b. Lage CSS med en fargekode som kan brukes til alle logoer -->

2. MySQL database
    a. Lage en for Nyheter
    b. Lage en for NavBar
    c. Lage en for Sider
    d. Lage en for Sponsorer

3. Backend Development
    a. Koble til Register og Login med cookies og Authentication
    b. Koble til Nyheter
    c. Koble til Sider
    d. Koble til Sponsorer
    e. Koble til NavBar

# What has been done
1. Frontend Development
    a. Installations
        I. yarn
        II. yarn add react-router-dom localforage match-sorter sort-by
        III. Flowbite and TailwindCSS installed
        IV. react-quill (Text Editor) installed

2. Database
    a. Tables
        I. Users (id, name, email, password)
        II. Posts (id, title, desc, img, date, fk_uid)
        III. Pages (id, title, desc, img, date, fk_uid)

3. Backend Development
    a. Installations
        I. npm init -y
        II. yarn add express mysql nodemon
        III. yarn add bcryptjs
        IV. yarn add jsonwebtoken
        V. yarn add axios (IN CLIENT)
        VI. yarn add cors
        VII. yarn add cookie-parser
        VIII. yarn add moment (IN CLIENT)
        