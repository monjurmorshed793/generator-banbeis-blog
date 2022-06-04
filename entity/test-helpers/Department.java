package bd.gov.banbeis.banbeisblog.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import bd.gov.banbeis.banbeisblog.domain.helper.LanguageType;

@Document("Department")
@Data
@Builder
@Schema(name="Department", description="Department")
public class Department{
    @Id
    private String id;
    private LanguageType name;
    private String description;
}
