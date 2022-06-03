package <%= entity.controllerDirectory %>;

import bd.gov.banbeis.banbeisblog.domain.CommonEntity;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface CommonController <E, ID>{
   public ResponseEntity<E>  create(final HttpServletRequest httpServletRequest,  E entity);

   public ResponseEntity<E> update(final HttpServletRequest httpServletRequest, E entity);

   public ResponseEntity<E> patch(final HttpServletRequest httpServletRequest, E entity);

   public ResponseEntity<List<E>> getAll();

   public ResponseEntity<E> get(ID id);

   public ResponseEntity<Void> delete(ID id);
}
