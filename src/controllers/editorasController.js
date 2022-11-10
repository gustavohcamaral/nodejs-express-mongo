import editoras from "../models/Editora.js";

class EditoraController {

    static cadastrarEditora = (req, res) => {
        let autor = new editoras(req.body);

        autor.save((err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`});
            }else{
                res.status(201).send(autor.toJSON());
            }
        })
    }

    static listarEditoras = (req, res) => {
        editoras.find((err, editoras) => {
            res.status(200).json(editoras);
        })
    }

    static listarEditoraPorId = (req, res) => {
        const id = req.params.id;

        editoras.findById(id, (err, editoras) => {
            if(err){
                res.status(400).send({message: `${err.message} - Id do Editora não localiozado.`});
            }else{
                res.status(200).send(editoras);
            }
        })
    }

    static atualizarEditora = (req, res) => {
        const id = req.params.id;

        editoras.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: `Editora Atualizado com Sucesso`});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

    static excluirEditora = (req, res) => {
        const id = req.params.id;

        editoras.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: `Editora Deletado com Sucesso`});
            }else{
                res.status(500).send({message: err.message});
            }
        })
    }

}

export default EditoraController;