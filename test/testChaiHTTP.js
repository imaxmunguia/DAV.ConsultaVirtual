let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Crear catedratico: ',()=>{

	it('Debe insertar un catedratico', (done) => {
		chai.request(url)
			.post('/api/catedraticos')
			.send({id_catedratico:"201811221745", nombre: {nombres:"Juan Daniel", apellidos:"Lanuza"}})
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Obtener todos los catedraticos: ',()=>{

	it('Debe obtener todos los catedraticos', (done) => {
		chai.request(url)
			.get('/api/catedraticos')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Obtener todos los usuarios: ',()=>{

	it('Debe obtener todos los usuarios', (done) => {
		chai.request(url)
			.get('/api/usuarios')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Obtener todos los planes de estudio: ',()=>{

	it('Debe obtener todos los planes de estudio', (done) => {
		chai.request(url)
			.get('/api/pensums')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Obtener todas las encuestas: ',()=>{

	it('Debe obtener todas las encuestas', (done) => {
		chai.request(url)
			.get('/api/encuestas')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Obtener todas las clases aprobadas: ',()=>{

	it('Debe obtener todas las clases aprobadas', (done) => {
		chai.request(url)
			.get('/api/clasesaprobadas')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});