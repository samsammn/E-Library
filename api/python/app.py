from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2, psycopg2.extras

app = Flask(__name__)
cors = CORS(app)

connection = psycopg2.connect(database="elibrary",user="postgres",password="password",host="localhost",port=5432)

@app.route('/buku')
def buku():
    dataBuku = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
    dataBuku.execute("Select * from buku")

    data = []
    for row in dataBuku.fetchall():
        data.append(dict(row))
    
    return jsonify(data), 200

@app.route('/insert-buku', methods=['POST'])
def insertBuku():

    judul = request.json['judul']
    noBuku = request.json['nobuku']
    penerbit = request.json['penerbit']
    pengarang = request.json['pengarang']
    tahunTerbit = request.json['tahunTerbit']
    gambar = request.json['gambar']

    tambahBuku = connection.cursor()
    tambahBuku.execute("Insert into buku (judul_buku, no_buku, penerbit, pengarang, tahun_terbit, gambar) values (%s,%s,%s,%s,%s,%s)",(judul, noBuku, penerbit, pengarang, tahunTerbit, gambar))
    connection.commit()

    return "Insert Success", 200

@app.route('/insert-peminjaman-temp', methods=['POST'])
def insertPeminjamanTemp():
    idBuku = request.json['idBuku']
    jumlah = request.json['jml']

    pilihBuku = connection.cursor()
    pilihBuku.execute("Insert into detail_peminjaman_temp (id_buku, jumlah) values (%s,%s)", (idBuku, jumlah))
    connection.commit()

    lihatBuku = connection.cursor(cursor_factory=psycopg2.extras.DictCursor)
    lihatBuku.execute("Select * from buku where id = %s",(idBuku,))

    data = []
    for row in lihatBuku.fetchall():
        data.append(dict(row))
    
    return jsonify(data), 200

@app.route('/empty-peminjaman-temp')
def emptyPeminjamanTemp():
    hapusTemp = connection.cursor()
    hapusTemp.execute("Delete from detail_peminjaman_temp")
    connection.commit()

    return "Empty Temp Success", 200

@app.route('/insert-peminjaman', methods=['POST'])
def insertPeminjaman():
    namaPeminjam = request.json['namaPeminjam']

    tambahPeminjaman = connection.cursor()
    tambahPeminjaman.execute("Insert into peminjaman (nama_peminjam, tgl_pinjam, tgl_pengembalian) values (%s,%s,%s",(namaPeminjam))
    connection.commit()

    return "Insert Peminjaman Success", 200

if __name__ == "__main__":
    app.run(debug=True,port=3000)
