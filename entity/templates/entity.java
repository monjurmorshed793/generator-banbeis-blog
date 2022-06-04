package <%= entity.modelDirectory %>;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
<%_ if (containsLanguageType(fields)) { _%>
import <%= entity.modelDirectory %>.helper.LanguageType;
<%_ } _%>
<%_ if (containsListType(fields)) { _%>
import java.util.List;
<%_ } _%>

@Document("<%= modelName %>")
@Data
@Builder
@Schema(name="<%= modelName %>", description="<%= modelName %>")
public class <%= modelName %>{
    @Id
    private String id;
<% for (const modelField of fields) { _%>
    private <%- modelField.type %> <%- modelField.fieldName %>;
<% } _%>
}
