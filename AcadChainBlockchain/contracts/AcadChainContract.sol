// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

// inherited contracts
import "./Ownable.sol";
import "./TeacherRole.sol";

contract AcadChainContract is Ownable, TeacherRole {
    struct TeacherData {
        string code;
        string[] subjectCodes;
        mapping(string => uint[]) passwordMap;
        mapping(string => Review[]) reviewMap;
    }

    struct Review {
        string[5] ratings;
        string comments;
    }

    struct TeacherRegistrationData {
        address userAddress;
        string teacherCode;
        string subjectCodes;
        string studentCounts;
    }

    mapping(address => TeacherRegistrationData) public teacherRegistrationData;
    mapping(string => TeacherData) teachers;
    mapping(uint => bool) usedPasswords;

    Review[] public reviews;
    address[] public teacherRegistrationKeys;

    modifier checkEitherOwnerOrTeacher() {
        if ((isOwner() == true) || (isTeacher(msg.sender) == true)) {
            _;
        }
    }

    event TeacherRegistrationDataStored(address indexed teacherAddress, string teacherCode, string subjectCodes, string studentCounts);


    function storeTeacherRegistrationData(
        string memory _teacherCode,
        string memory _subjectCodes,
        string memory _studentCounts
    ) public {
        // Input validation
        require(bytes(_teacherCode).length > 0, "Teacher code cannot be empty");
        require(bytes(_subjectCodes).length > 0, "Subject codes cannot be empty");
        require(bytes(_studentCounts).length > 0, "Student counts cannot be empty");
        TeacherRegistrationData memory newTeacherRegistrationData = TeacherRegistrationData({
            userAddress: msg.sender,
            teacherCode: _teacherCode,
            subjectCodes: _subjectCodes,
            studentCounts: _studentCounts
        });
        teacherRegistrationData[msg.sender] = newTeacherRegistrationData;
        teacherRegistrationKeys.push(msg.sender);
        emit TeacherRegistrationDataStored(msg.sender, _teacherCode, _subjectCodes, _studentCounts);
    }

    function getTeacherRegistrationData()
        public
        view
        returns (TeacherRegistrationData[] memory)
    {
        TeacherRegistrationData[] memory data = new TeacherRegistrationData[](teacherRegistrationKeys.length);

        for (uint i = 0; i < teacherRegistrationKeys.length; i++) {
            TeacherRegistrationData storage trd = teacherRegistrationData[teacherRegistrationKeys[i]];
            data[i] = TeacherRegistrationData({
                userAddress: trd.userAddress,
                teacherCode: trd.teacherCode,
                subjectCodes: trd.subjectCodes,
                studentCounts: trd.studentCounts
            });
        }
        return data;
    }

    function deleteTeacherRegistrationData(address _userAddress) public onlyOwner {
    // Delete data associated with the specified user address
    delete teacherRegistrationData[_userAddress];

    // Find the index of the user address in teacherRegistrationKeys and remove it
    for (uint i = 0; i < teacherRegistrationKeys.length; i++) {
        if (teacherRegistrationKeys[i] == _userAddress) {
            // Shift the remaining elements to fill the gap
            for (uint j = i; j < teacherRegistrationKeys.length - 1; j++) {
                teacherRegistrationKeys[j] = teacherRegistrationKeys[j + 1];
            }

            // Remove the last element to avoid duplication
            teacherRegistrationKeys.pop();
            break; // No need to continue once the address is found and removed
        }
    }
    }

    function addNewTeacher(
        string memory _teacherCode,
        string[] memory _subjectCodes,
        uint[] memory _studentCount
    ) public onlyOwner {
        teachers[_teacherCode].code = _teacherCode;
        teachers[_teacherCode].subjectCodes = _subjectCodes;

        for (uint i = 0; i < _subjectCodes.length; i++) {
            uint[] memory passwords = new uint[](_studentCount[i]);
            for (uint j = 0; j < _studentCount[i]; j++) {
                uint password = uint(
                    keccak256(
                        abi.encodePacked(
                            msg.sender,
                            _teacherCode,
                            _subjectCodes[i],
                            j
                        )
                    )
                ) % 100000;
                passwords[j] = password;
            }
            teachers[_teacherCode].passwordMap[_subjectCodes[i]] = passwords;
        }
    }

    function getTeacher(
        string memory _teacherCode
    )
        public
        view
        checkEitherOwnerOrTeacher
        returns (string memory code, string[] memory subjectCodes)
    {
        TeacherData storage teacher = teachers[_teacherCode];
        return (teacher.code, teacher.subjectCodes);
    }

    function getPasswords(
        string memory _teacherCode,
        string memory _subjectCode
    ) public view checkEitherOwnerOrTeacher returns (uint[] memory passwords) {
        return teachers[_teacherCode].passwordMap[_subjectCode];
    }

    function getReview(
        string memory _teacherCode,
        string memory _subjectCode
    ) public view checkEitherOwnerOrTeacher returns (Review[] memory review) {
        return (teachers[_teacherCode].reviewMap[_subjectCode]);
    }

    function addReview(
        string memory _teacherCode,
        string memory _subjectCode,
        string[5] memory _ratings,
        string memory _comments,
        uint _password
    ) public {
        uint[] memory passwords = teachers[_teacherCode].passwordMap[
            _subjectCode
        ];
        require(passwords.length > 0, "Invalid teacher or subject code");
        require(!usedPasswords[_password], "Password has already been used");
        bool passwordMatch = false;
        for (uint i = 0; i < passwords.length; i++) {
            if (passwords[i] == _password) {
                passwordMatch = true;
                break;
            }
        }
        require(passwordMatch, "Invalid password");
        usedPasswords[_password] = true;
        teachers[_teacherCode].reviewMap[_subjectCode].push(
            Review(_ratings, _comments)
        );
    }
}
