CREATE VIEW VIEW_INQUIRY_LIST AS
(SELECT ID, MEMBER_INQUIRY_TYPE, MEMBER_NAME, MEMBER_EMAIL, TO_CHAR(CREATED_DATE, 'YYYY-MM-DD') , MEMBER_INQUIRY_STATUS, MEMBER_INQUIRY_DETAIL
FROM
    (
        SELECT ID, MEMBER_INQUIRY_TYPE, MEMBER_NAME, MEMBER_EMAIL, CREATED_DATE, MEMBER_INQUIRY_STATUS, MEMBER_INQUIRY_DETAIL
        FROM
            (
                SELECT MI.ID, MEMBER_INQUIRY_TYPE, MEMBER_NAME, MEMBER_EMAIL, MI.CREATED_DATE, MEMBER_INQUIRY_STATUS, MEMBER_INQUIRY_DETAIL
                FROM TBL_MEMBER_INQUIRY MI JOIN TBL_MEMBER M
                                                ON MI.MEMBER_ID = M.ID
                                                    <if test="status != 'all' and status != null">
                WHERE MEMBER_STATUS = #{status}
    </if>
    <if test="keyword != null">
        AND MEMBER_NAME LIKE '%' || #{keyword} || '%'
    </if>
    <if test="date != 0">
        AND CEIL(SYSDATE - TO_DATE(MEMBER_RECENT_LOGIN)) <![CDATA[ <= #{date}]]>
    </if>
    ORDER BY ID DESC
           )
    <![CDATA[
        WHERE ROWNUM <= ${endRow}
]]>
)
<![CDATA[
WHERE ROWNUM <= ${endRow}
]]>)