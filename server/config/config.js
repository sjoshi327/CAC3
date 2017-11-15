module.exports = {
    config: {
        user: 'sa',
        password: 'niit@123',
        server: '192.168.252.174',
        database: 'ntlniitess_bkp',
        options: { encrypt: false }
    },
    query: `SELECT EMPNO,NAME,DOJ,DESIGNATION,PRACTICE,OUTXT,PSATXT,SUPERVCODE FROM ZEMP_MAST_WEB_AL WHERE BASEEMP='`,
    port: '4024',
};