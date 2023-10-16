// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.24;
pragma experimental ABIEncoderV2;
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

    Review[] public reviews;

    mapping(string => TeacherData) teachers;
    mapping(uint => bool) usedPasswords;

    modifier checkEitherOwnerOrTeacher() {
        if ((isOwner() == true) || (isTeacher(msg.sender) == true)) {
            _;
        }
    }

    function addTeacher(
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
    ) public view checkEitherOwnerOrTeacher returns (string memory code, string[] memory subjectCodes)
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
    ) public view checkEitherOwnerOrTeacher returns (Review[] memory) {
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
