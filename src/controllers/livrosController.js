import livros from "../models/Livro.js";

class LivroController {

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);

        livro.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`});
            }else{
                res.status(201).send(livro.toJSON());
            }
        })
    }

    static listarLivros = (req, res) => {
        livros.find()
        .populate('autor')
        .populate('editora')
        .exec((err, livros) => {
            res.status(200).json(livros);
        })
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;

        livros.findById(id)
        .populate('autor', 'nome')
        .populate('editora')
        .exec((err, livros) => {
            if(err){
                res.status(400).send({message: `${err.message} - Id do Livro não localiozado.`});
            }else{
                res.status(200).send(livros);
            }
        })
    }

    static listarLivrosPorEditora = (req, res) => {
        const editora = req.query.editora;

        livros
        .find({'editora':editora}, {})
        .populate('autor', 'nome')
        .populate('editora')
        .exec((err, livros) => {
            if(err){
                res.status(400).send({message: `${err.message} - Livro não localizado para a editora informada.`});
            }else{
                res.status(200).send(livros);
            }
        })


    } 

    static atualizarLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: `Livro Atualizado com Sucesso`});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static excluirLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: `Livro Deletado com Sucesso`});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

}

export default LivroController;