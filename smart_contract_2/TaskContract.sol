
pragma solidity ^0.8.6;

contract TaskContract {

    string public name = "UCE COIN";
    string public symbol ="UCE";

    struct Estudiante {
        address cuentaEstudiante;
        string nombres;
        string apellidos;
        string correo;
        string celular;
        string cedula;

    }

    struct Profesor {
        address cuentaProfesor;
        string nombres;
        string apellidos;
        string correo;
        string celular;
        string cedula;

    }

    struct UCE {
        address cuentaUCE;
        string correo;
        string telefono;

    }

    struct NegocioUCE {
        address cuentaNegocioUCE;
        string nombreNegocioUCE;
        string correoNegocioUCE;
        string celularNegocioUCE;
        string rucNegocioUCE;
    }

//****** Variables de estado

    mapping(address => Estudiante) public estudiantes;
    mapping(address => Profesor) public profesores;
    mapping(address => UCE) private UCE;
    mapping(address => NegocioUCE) private negociosUCE;

    mapping(address => uint) public gastoTotalDeEstudiantesUCE;
    mapping(address => uint) public gastoTotalPorNegocioUCE;







    //-------------------- tesis andrade sanchez
    mapping (address => uint256) public balanceOf;

/* Inicializa el contrato con el balance inicial de los Tokens al creador del contrato */
 function MyToken(
 uint256 initialSupply
) public {
 balanceOf[msg.sender] = initialSupply; // Da al creador el saldo inicial
 }


/* Enviar Monedas */
 function transfer(address _to, uint256 _value) public returns (bool success) {
     require(balanceOf[msg.sender] >= _value); // Verifica el saldo del remitente
     require(balanceOf[_to] + _value >= balanceOf[_to]); // Verifica sobreflujo
     balanceOf[msg.sender] -= _value; // Retira del remitente
     balanceOf[_to] += _value; // Agrega al receptor
    return true;
 }

//tuto ethereum solidity lang
    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        if (amount > balances[msg.sender])
            revert InsufficientBalance({
            requested: amount,
            available: balances[msg.sender]
            });

        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
