package com.cos.everytimessage.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MessageRespDto {
	private Long msg_id;
	private String content;
	
}
