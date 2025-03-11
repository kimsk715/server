package com.app.temp.service;

import com.app.temp.domain.dto.ApplyDTO;
import com.app.temp.repository.ApplyDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ApplyService {
    private final ApplyDAO applyDAO;

    public void apply(ApplyDTO applyDTO) {
        applyDAO.set(applyDTO);
    }
}
