SELECT * FROM TBL_PROGRAM;

INSERT INTO TBL_PROGRAM
VALUES (
           SEQ_PROGRAM.NEXTVAL,
           '양치질',
           '열심히',
           '자주',
           '공개',
           '2025-02-02',
           2500,
           2,
           '첫번째.JGP',
           SYSDATE,
           SYSDATE,
           17,
           2,
           SYSDATE,
           SYSDATE
       );

INSERT INTO TBL_COMPANY
VALUES
    (
        SEQ_COMPANY.NEXTVAL,
        'COMPANY.TEST',
        1,
        '2020-10-20',
        19201212,
        'TEST-1234 HOME',
        'TEST/TEST.JGP',
        'ASDW',
        'test/test/test',
        'this is test',
        'this is test',
        'this is test',
        SYSDATE,
        SYSDATE
    );


SELECT * FROM TBL_SCRAP JOIN TBL_PROGRAM

    INSERT INTO TBL_CATEGORY_C
VALUES (SEQ_CATEGORY_C.NEXTVAL, '카테고리C', 2, SYSDATE, SYSDATE);

INSERT INTO TBL_SCRAP
VALUES (SEQ_SCRAP.NEXTVAL, 1, 29, SYSDATE, SYSDATE);

SELECT * FROM TBL_CATEGORY_C;
SELECT * FROM TBL_PROGRAM;
SELECT * FROM TBL_COMPANY;

SELECT * FROM TBL_SCRAP;

SELECT * FROM TBL_MEMBER;


SELECT P.ID, C.COMPANY_NAME, P.PROGRAM_NAME, P.PROGRAM_END_DATE, P.PROGRAM_THUMBNAIL_PATH, P.CATEGORY_C_ID, CEIL(TO_DATE(PROGRAM_END_DATE)-SYSDATE) DDAY,  CA.ID AS CATEGORY_A_ID
FROM TBL_PROGRAM P
         JOIN TBL_COMPANY C ON P.COMPANY_ID = C.ID
         JOIN TBL_CATEGORY_C CC ON CC.ID = P.CATEGORY_C_ID
         JOIN TBL_CATEGORY_B CB ON CC.CATEGORY_B_ID = CB.ID
         JOIN TBL_CATEGORY_A CA ON CB.CATEGORY_A_ID = CA.ID
WHERE P.ID IS NOT NULL AND CA.ID IN(10);





