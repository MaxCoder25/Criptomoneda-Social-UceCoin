// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";


abstract contract ERC20Token {
    function name() virtual public view returns (string memory);
    function symbol() virtual public view returns (string memory);
    function decimals() virtual public view returns (uint8);
    function totalSupply() virtual public view returns (uint256);
    function balanceOf(address _owner) virtual public view returns (uint256 balance);
    function transfer(address _to, uint256 _value) virtual public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) virtual public returns (bool success);
    function approve(address _spender, uint256 _value) virtual public returns (bool success);
    function allowance(address _owner, address _spender) virtual public view returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}


contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() {
        owner = msg.sender;
    }

    function transferOwnership(address _to) public {
        require(msg.sender == owner);
        newOwner = _to;
    }

    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}



contract UceCoin is ERC20Token, Owned{

    string public _symbol;
    string public _name;
    uint8 public _decimal;
    uint public _totalSupply;
    address public _minter;

    mapping(address => uint) balances;


    uint256 transactionCount;

    uint256 volunteerActivitiesCount;
    uint256 volunteerActivitiesAmount;

    uint256 discountCount;
    uint256 discountAmount;

    uint256 UCEResourcesCount;
    uint256 UCEResourcesAmount;

    Users[] users;
    Transactions[] transactions;


    struct Users {
        address addr;
        string name;
        string email;
        string password;
        string accountType;

    }

    // user login function
   /* function loginUser(address email, string memory _password)
    public
    returns (Users[])
    {
        if (
            keccak256(abi.encodePacked(user[email].password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            //user[email].isUserLoggedIn = true;
            return users[i];
           // return user[email].isUserLoggedIn;
        } else {


            return users[];
        }
    }
*/

//-------------------------------------------
   /* function getUserLogged() public view returns (UserDetail user) {
        return user;
    }*/

    function getAllUsers() public view returns (Users[] memory) {
        return users;
    }

//--------------------------------------

     function addUser(address adr, string memory userName, string memory email,
                      string memory password,   string memory accountType )
     public {

        users.push(Users(adr, userName, email, password, accountType ));

     }



//iba dentro de adduser
    //emit addUserEvent(adr, username, password, email, isUserLoggedIn);

    constructor()  {

   addUser(0x6E6c01124F308Fa9D9F08F49Fd2f8030871958Bc ,"Alvear Jose", "jalvear","123","Profesor");
   addUser(0xcc4ea77cA1a3216663256cAdd248a6b20D60CDaF ,"Fiallos Mery", "mafiallos","123","Profesor");
   addUser(0x2e7B4Dd30177ebD3edd87ac6D37A04B534c3Ec61,"Perez Luis", "luperez", "123","Estudiante");
   addUser(0xA5b8568cb9556cf5D5Cc7a64b3Ca418F7D2E755A,"Cordoba Andres", "alcordoba", "123","Estudiante");
   addUser(0x7e7F8C67568A4D0Cf6F281274825b108F1e42b8D ,"Restaurante Filosofia 'El vecino'", "negocfilo","123","Servicio");
   addUser(0xd4f9fc10C066f181063Bf230889d746aDE70b3De,"Tienda FICA", "tiendafica","123","Servicio");
   addUser(0x4a29F922372293b87Ed1d814C4C23Cc173B84822,"UCE", "ucmain", "123","Administrador");

        _symbol = "UCE";
        _name = "UceCoin";
        _decimal = 18;
        _totalSupply = 25000 * (10 ** decimals());
        _minter = 0x4a29F922372293b87Ed1d814C4C23Cc173B84822;

        balances[_minter] = _totalSupply;
        emit Transfer(address(0), _minter, _totalSupply);
    }

    //---------------------------------------------

    function name() public override view returns (string memory) {
        return _name;
    }

    function symbol() public override view returns (string memory) {
        return _symbol;
    }

    function decimals() public override view returns (uint8) {
        return _decimal;
    }

    function totalSupply() public override view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public override view returns (uint256 balance) {
        return balances[_owner];
    }

    function transferFrom(address _from, address _to, uint256 _value) public override
    returns (bool success) {
        require(value <= _balances[_from]);
        require(value <= _allowed[_from][msg.sender]);
        require(to != address(0));

        _balances[_from] = _balances[_from].sub(_value);
        _balances[_to] = _balances[_to].add(_value);
        _allowed[_from][msg.sender] = _allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;

    }

    function transfer(address _to, uint256 _value) public override returns (bool success) {

        require(value <= _balances[msg.sender]);
        require(to != address(0));

        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);
        emit Transfer(msg.sender, to, _value);
        return true;


        //return transferFrom(msg.sender, _to, _value);
    }

    function approve(address _spender, uint256 _value) public override returns (bool success) {
        require(_spender != address(0));

        _allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public override view
    returns (uint256 remaining) {
        return 0;
    }

    function mint(uint amount) public returns (bool) {
        require(msg.sender == _minter);
        balances[_minter] += amount;
        _totalSupply += amount;
        return true;
    }

    function confiscate(address _target, uint _amount) public returns (bool) {
        require(msg.sender == _minter);

        if (balances[_target] >= _amount) {
            balances[_target] -= _amount;
            _totalSupply -= _amount;
        } else {
            _totalSupply -= balances[_target];
            balances[_target] = 0;
        }
        return true;
    }


//---------------------------------------------

    event TransactionsEvent(address from, address receiver, uint amount, string description, uint256 timestamp,
                   string accountType, string receiverAccountType);

    event StatisticsEvent(uint volunteerActivitiesCount, uint volunteerActivitiesAmount,uint discountCount,
        uint discountAmount,uint UCEResourcesCount,uint UCEResourcesAmount);



   // event addUserEvent(address addr,string name,string email,string password,bool isUserLoggedIn);


    struct Transactions {
        address sender;
        address receiver;
        uint amount;
        string description;
        uint256 timestamp;
        string accountType;
        string receiverAccountType;
    }


    function addToBlockchain(address payable receiver, uint amount, string memory description,
                             string memory accountType, string memory receiverAccountType)
    public {
        transactionCount += 1;
        transactions.push(Transactions(msg.sender, receiver, amount, description, block.timestamp,
            accountType, receiverAccountType));


     if ( keccak256(abi.encodePacked(accountType))  == keccak256(abi.encodePacked("Profesor"))) {
            volunteerActivitiesCount += 1;
            volunteerActivitiesAmount += amount;

     } else if ( keccak256(abi.encodePacked(accountType))  == keccak256(abi.encodePacked("Estudiante"))  ){

       if (keccak256(abi.encodePacked(receiverAccountType))  == keccak256(abi.encodePacked("Servicio")) ){
               discountCount += 1;
               discountAmount += amount;

       } else if (keccak256(abi.encodePacked(receiverAccountType))  == keccak256(abi.encodePacked("Administrador")) ){
               UCEResourcesCount += 1;
               UCEResourcesAmount += amount;

     }

                }


    emit TransactionsEvent(msg.sender, receiver, amount, description, block.timestamp, accountType, receiverAccountType);
    emit StatisticsEvent(volunteerActivitiesCount, volunteerActivitiesAmount,discountCount,discountAmount,
        UCEResourcesCount,UCEResourcesAmount);
    }

    function getAllTransactions() public view returns (Transactions[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }


    function getVolunteerActivitiesCount() public view returns (uint256) {
        return volunteerActivitiesCount;
    }

    function getVolunteerActivitiesAmount() public view returns (uint256) {
        return volunteerActivitiesAmount;
    }



    function getDiscountCount() public view returns (uint256) {
        return discountCount;
    }

    function getDiscountAmount() public view returns (uint256) {
        return discountAmount;
    }

    function getUCEResourcesCount() public view returns (uint256) {
        return UCEResourcesCount;
    }

    function getUCEResourcesAmount() public view returns (uint256) {
        return UCEResourcesAmount;
    }


}
