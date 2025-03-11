package com.app.temp.repository;

import com.app.temp.domain.dto.ApplyDTO;
import com.app.temp.mapper.ApplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ApplyDAO {
    private final ApplyMapper applyMapper;
    public void set(ApplyDTO applyDTO) {
        applyMapper.insert(applyDTO);
    }
}
