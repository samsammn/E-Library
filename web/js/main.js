function getAllBooks(){
    $.ajax({
        url: 'http://localhost:3000/buku',
        type: 'GET',
        success:function(msg){
            no=1;
            $.each(msg, function(val){
                data = msg[val]
                // console.log(data)

                $('#data-buku').append(`
                    <tr>
                        <td>${no}</td>
                        <td><img src='${data.gambar}' width='40px'></td>
                        <td>${data.judul_buku}</td>
                        <td>${data.penerbit}</td>
                        <td>${data.pengarang}</td>
                        <td>${data.tahun_terbit}</td>
                    </tr>
                `)
                no++;
            })
        }
    })
}

function getSelectBooks(){
    $.ajax({
        url: 'http://localhost:3000/buku',
        type: 'GET',
        success:function(msg){
            no=1;
            $.each(msg, function(val){
                data = msg[val]
                // console.log(data)

                $('#pilih-buku').append(`<option value='${data.id}'>${data.judul_buku}</option>`)
                no++;
            })
        }
    })
}

function insertBooks(){

    let isian = {
        judul: $('#judul').val(),
        nobuku: $('#nobuku').val(),
        penerbit: $('#penerbit').val(),
        pengarang: $('#pengarang').val(),
        tahunTerbit: $('#tahun_terbit').val(),
        gambar: $('#gambar').val()    
    }

    $.ajax({
        url: 'http://localhost:3000/insert-buku',
        type: 'POST',
        data: JSON.stringify(isian),
        contentType: 'application/json',
        complete: function(msg){
            alert('Tambah Buku Berhasil')
            document.location='index.html'
            console.log(msg)
        }
    })
}

function insertPeminjamanTemp(){
    let isian = {
        idBuku: $('#pilih-buku').val(),
        jml: $('#jml').val()
    }

    $.ajax({
        url: 'http://localhost:3000/insert-peminjaman-temp',
        type: 'POST',
        data: JSON.stringify(isian),
        contentType: 'application/json',
        complete: function(msg){
            data = msg['responseJSON']
            console.log(data[0]['gambar'])

            $('#data-buku').append(`
                <tr>
                    <td><img src='${data[0]['gambar']}' width='40px'></td>
                    <td>${data[0]['judul_buku']}</td>
                    <td>${data[0]['penerbit']}</td>
                    <td>${data[0]['pengarang']}</td>
                    <td>${data[0]['tahun_terbit']}</td>
                    <td>${$('#jml').val()}</td>
                </tr>
            `)
    
        }
    })    
}

function insertPeminjaman(){
    let isian = {
        namaPeminjam: $('#nama_peminjam').val()
    }

    $.ajax({
        url: 'http://localhost:3000/insert-peminjaman',
        type: 'POST',
        data: JSON.stringify(isian),
        success: function(msg){
            console.log(msg)
        }
    })
}

function emptyPeminjamanTemp(){
    $.ajax({
        url: 'http://localhost:3000/empty-peminjaman-temp',
        type: 'GET',
        success: function(msg){
            console.log(msg)
        }
    })
}