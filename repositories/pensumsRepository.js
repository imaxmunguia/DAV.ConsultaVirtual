var model = require('../models/Pensums');
var clasesAprobadasRepository= require('./clasesAprobadasRepository');
var UserRepository = require('./usuariosRepository');

exports.findAll = function(req, res){
	model.find(function(err, items){
    	if(err) 
    		res.status(500).send(err.message);
    	else
    		res.status(200).json(items);
    	console.log('GET /pensums')
	});
};


exports.lista = function(req, res){
	model.find(function(err, items){
    	if(err) 
    		res.status(500).send(err.message);
    	else
			var lista={};
			for(let i=0;i<items.length ; i++){
				let pensum=items[i];
				lista[pensum.id_carrera+'_'+pensum.nombre]={
					id_carrera: pensum.id_carrera,
					nombre:pensum.nombre,
					desc_carrera: pensum.desc_carrera,
				}
			}
			res.status(200).json(Object.values(lista))
    	console.log('GET /pensums')
	});
};


exports.cursadas = function(req, res){
	var profile = UserRepository.getUserProfile(req)
    if(profile==null &&  (profile!=='Estudiante' || profile!=='Alumno')){
        res.status(400).send('Permisos insuficientes');
        return;
    }
	UserRepository.getUser(req).then((user)=>{
		model.find({
			id_carrera:user.id_carrera
		}).lean().exec(async function(err, items){
			if(err)
				res.status(500).send(err.message);
			else{
				for(let i=0;i<items.length ; i ++){
					let clase=items[i];
					let cursada= await clasesAprobadasRepository.find(user.id_carrera,user._id,clase._id);
					if(cursada==null){
						items[i]['cursada']=false;
					}else{
						items[i]['cursada']=true;
					}	
				}
				res.status(200).send(items);
			}
			console.log('GET /pensums')
		});
	})
	
};

exports.clases = function(req, res){
	UserRepository.getUser(req).then((user)=>{
		console.log(user);
		model.find({
			id_carrera:user.id_carrera
		},function(err, items){
			if(err) 
				res.status(500).send(err.message);
			else{
				let clases={};
				items.map((e)=>{
					clases[e._id]={
						id:e._id,
						desc_clase:e.desc_clase
					}
				});
				res.status(200).json(Object.values(clases));
			}
			console.log('GET /pensums')
		});
	});
	
};

exports.findById = function(req, res){
	model.findById(req.params.id,function(err, items){
    	if(err) 
    		res.status(500).send(err.message);
    	else
    		res.status(200).json(items);
    	console.log('GET /pensums/id/'+req.params.id)
	});
};

exports.addItem = function(req, res){
	console.log('POST /pensums');
	console.log(req.body);

	var newItem = new model({
        id_carrera     : req.body.id_carrera,
        desc_carrera   : req.body.desc_carrera,
        id_clase       : req.body.id_clase,
        desc_clase     : req.body.desc_clase,
        id_requisito   : req.body.id_requisito,
        desc_requisito : req.body.desc_requisito
	});

	newItem.save(function(err, item){
		if(err) 
			return res.status(500).send( err.message);
    	res.status(200).jsonp(item);
	});
};

exports.updateItem = function(req, res) {
	model.findById(req.params.id, function(err, item) {
		item.id_carrera = req.body.id_carrera;
		item.desc_carrera = req.body.desc_carrera;
		item.id_clase = req.body.id_clase;
		item.desc_clase = req.body.desc_clase;
		item.id_requisito = req.body.id_requisito;
		item.desc_requisito = req.body.desc_requisito;

		item.save(function(err) {
			if(err) 
				return res.status(500).send(err.message);
      		res.status(200).jsonp(item);
		});
	});
};


exports.deleteItem = function(req, res) {
	model.findById(req.params.id, function(err, item) {
		item.remove(function(err) {
			if(err) 
				return res.status(500).send(err.message);
     	 	res.status(200).send();
		});
	});
};


exports.findSinDependencias = async  function(id_carrera,id_alumno) {
	let clasesCarrera= await model.find({id_carrera:id_carrera});
	let clasesPasadas= await clasesAprobadasRepository.findByUser(id_carrera,id_alumno);
	let id_clases=[];
	let id_clasespasadas=clasesPasadas.map((clase)=>clase.id_clase);
	console.log('clases pasadas');
	console.log(id_clasespasadas);
	for(let i=0; i<clasesCarrera.length ; i ++){
		let clase=clasesCarrera[i];
		if(clase.id_requisito!==null && typeof clase.id_requisito!=='undefined' && clase.id_requisito.length>0){
			let sinDependenciasPendienes=true;
			for(let i=0;i<clase.id_requisito.length;i++){
				let requisito=clase.id_requisito[i];
				console.log('requisito');
				console.log(requisito);
				if(requisito.length>0 && id_clasespasadas.indexOf(requisito)<0){
					sinDependenciasPendienes=false;
				};
			}
			if(sinDependenciasPendienes){
				id_clases.push(clase._id);
			}
		}else{
			id_clases.push(clase._id);
		}
	}
	console.log(id_clases)
	return id_clases;
};