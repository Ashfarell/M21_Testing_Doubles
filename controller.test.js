const {spy, stub, assert, mock} = require('sinon')
const {Database } = require('./database');
const {UsuariosController} = require('./controller')

let respostaEsperada                        //c/ BeforeAll
describe('Controller de Usuários', () => {

    beforeAll(() => {                           //Usado c/ let respostaEsperada
         const respostaEsperada = [
            {
                id: 1, 
            nome: 'João',
            email: 'joao.gmail.com'
            }
        ]
    });

    it('fake', () => {
        
        const fakeDatabase = {
            findAll(){
                return respostaEsperada
            }
        }
const controller = new UsuariosController(fakeDatabase)
 const response = controller.getAll()

expect(response).toEqual(respostaEsperada)
    });

it('spy', () => {
    const findAll = spy(Database, 'findAll')
    const controller = new UsuariosController(Database)
    controller.getAll()

   assert.calledWith(findAll, 'usuarios')           //Fazendo validação se o método foi chamado com o parâmetro correto
    findAll.restore()    //Restaurando o método original para evitar efeitos colaterais em outros testes
});

it ('stub', () => {
    const findAll = stub(Database, 'findAll')
    findAll.withArgs('usuarios').returns(respostaEsperada)

    const controller = new UsuariosController(Database)
    const response = controller.getAll()

    assert.calledWith(findAll, 'usuarios')
    expect(response).toEqual(respostaEsperada)

    findAll.restore()
});

it('mock', () => {
    const dbMock = mock(Database)
    dbMock.expects('findAll').once().withArgs('usuarios').returns(respostaEsperada)

    const controller = new UsuariosController(Database)
    const response = controller.getAll()

    expect(response).toEqual(respostaEsperada)

    dbMock.verify()
    dbMock.restore()
});
})